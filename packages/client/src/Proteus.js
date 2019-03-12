/**
 * Copyright (c) 2017-present, Netifi Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @flow
 */

('use-strict');

import {DuplexConnection, Responder, ReactiveSocket} from 'rsocket-types';
import {Single} from 'rsocket-flowable';
import type {PayloadSerializers} from 'rsocket-core/build/RSocketSerialization';
import {BufferEncoders} from 'rsocket-core';
import {RpcClient, RequestHandlingRSocket} from 'rsocket-rpc-core';
import type {ClientConfig} from 'rsocket-rpc-core';
import invariant from 'fbjs/lib/invariant';
import {DeferredConnectingRSocket, UnwrappingRSocket} from './rsocket';
import {FrameTypes, encodeFrame} from './frames';
import type {Tags} from './frames';

import RSocketWebSocketClient from 'rsocket-websocket-client';

export type ProteusConfig = {|
  serializers?: PayloadSerializers<Buffer, Buffer>,
  setup: {|
    group: string,
    destination?: string,
    tags?: Tags,
    keepAlive?: number,
    lifetime?: number,
    accessKey: number,
    accessToken: string,
    connectionId?: string,
    additionalFlags?: {|
        public?: boolean
      |}
  |},
  transport: {|
    url?: string,
    wsCreator?: (url: string) => WebSocket,
    // encoder?: Encoders<*>, *** Right now only BufferEncoder is supported for WebSocket so do not allow passing it in if using a URL ***
    connection?: DuplexConnection,
  |},
  responder?: Responder<Buffer, Buffer>,
|};

export default class Proteus {
  _client: RpcClient<Buffer, Buffer>;
  _group: string;
  _tags: Tags;
  _connect: () => Single<ReactiveSocket<Buffer, Buffer>>;
  _connecting: Object;
  _connection: ReactiveSocket<Buffer, Buffer>;
  _requestHandler: RequestHandlingRSocket;
  _lastConnectionAttemptTs: number;
  _attempts: number;

  constructor(
    group: string,
    tags: Tags,
    proteusClient: RpcClient<Buffer, Buffer>,
    requestHandler: RequestHandlingRSocket,
  ) {
    this._client = proteusClient;
    this._group = group;
    this._tags = tags;
    this._connect = () => {
      if (this._connection) {
        return Single.of(this._connection);
      } else if (this._connecting) {
        return new Single(subscriber => {
          this._connecting.subscribe(subscriber);
        });
      } else {
        /** * This is a useful Publisher implementation that wraps could feasibly wrap the Single type ** */
        /** * Might be useful to clean up and contribute back or put in a utility or something ** */
        this._connecting = (function() {
          const _subscribers = [];
          let _connection: ReactiveSocket<Buffer, Buffer>;
          let _error: Error;
          let _completed = false;
          return {
            onComplete: connection => {
              // Memoize for future subscribers
              _completed = true;
              _connection = connection;

              _subscribers.map(subscriber => {
                if (subscriber.onComplete) {
                  subscriber.onComplete(connection);
                }
              });
            },

            onError: error => {
              _completed = true;
              _error = error;
              _subscribers.map(subscriber => {
                if (subscriber.onError) {
                  subscriber.onError(error);
                }
              });
            },

            onSubscribe: cancel => {
              _subscribers.map(subscriber => {
                if (subscriber.onSubscribe) {
                  subscriber.onSubscribe(cancel);
                }
              });
            },

            subscribe: subscriber => {
              if (_completed) {
                subscriber.onSubscribe();
                subscriber.onComplete(_connection);
              } else if (_error) {
                subscriber.onSubscribe();
                subscriber.onError(_error);
              } else {
                _subscribers.push(subscriber);
                if (subscriber.onSubscribe) {
                  subscriber.onSubscribe(() => {
                    const idx = _subscribers.indexOf(subscriber);
                    if (idx > -1) {
                      _subscribers.splice(idx, 1);
                    }
                  });
                }
              }
            },
          };
        })();

        this._connecting.subscribe({
          onComplete: connection => {
            this._connection = connection;
          },
          onError: err => {
            console.warn('An error has occurred while connecting:');
            console.warn(err);
          },
          onSubscribe: cancel => {
            // do nothing
          },
        });

        setTimeout(
          () => proteusClient.connect().subscribe(this._connecting),
          this.calculateRetryDuration(),
        );

        return this._connecting;
      }
    };
    this._requestHandler = requestHandler;
  }

  myGroup(): string {
    return this._group;
  }

  myTags(): string {
    return this._tags;
  }

  broadcast(group: string, tags?: Tags): ReactiveSocket<Buffer, Buffer> {
    return DeferredConnectingRSocket.broadcast(group, tags, this._connect);
  }

  group(group: string, tags?: Tags): ReactiveSocket<Buffer, Buffer> {
    return DeferredConnectingRSocket.group(group, tags, this._connect);
  }

  destination(
    destination: string,
    group: string,
  ): ReactiveSocket<Buffer, Buffer> {
    return DeferredConnectingRSocket.group(group, {destination}, this._connect);
  }

  addService(service: string, handler: Responder<Buffer, Buffer>): void {
    this._requestHandler.addService(service, handler);
  }

  close(): void {
    this._client.close();
  }

  calculateRetryDuration(): number {
    const currentTs = Date.now();
    const oldTs = this._lastConnectionAttemptTs || 0;
    const calculatedDuration = Math.min(this._attempts, 30);

    if (currentTs - oldTs > 60000) {
      this._attempts = 0;
    }

    this._lastConnectionAttemptTs = currentTs;

    this._attempts++;

    return calculatedDuration * 1000;
  }

  static create(config: ProteusConfig): Proteus {
    invariant(
      config &&
        config.setup &&
        config.setup.accessKey &&
        config.setup.accessToken &&
        config.transport,
      'Proteus: Falsey config is invalid. At minimum transport config, group, access key, and access token are required.',
    );

    invariant(
      config.transport.connection || config.transport.url,
      'Proteus: Transport config must supply a connection or a URL',
    );

    // default to GUID-y destination ID
    const destination =
      config.setup.destination !== undefined
        ? config.setup.destination
        : uuidv4();
    const tags =
      config.setup.tags !== undefined
        ? {destination, ...config.setup.tags}
        : {destination};
    const keepAlive =
      config.setup.keepAlive !== undefined
        ? config.setup.keepAlive
        : 60000; /* 60s in ms */
    const lifetime =
      config.setup.lifetime !== undefined
        ? config.setup.lifetime
        : 360000; /* 360s in ms */
    const accessKey = config.setup.accessKey;
    const accessToken = Buffer.from(config.setup.accessToken, 'base64');
    /* If a connectionId is not provided, seed it */
    const connectionId = typeof config.setup.connectionId !== 'undefined' ?
      config.setup.connectionId : Date.now().toString();
    const additionalFlags = typeof config.setup.additionalFlags !== 'undefined' ?
      config.setup.additionalFlags : {};

    const transport: DuplexConnection =
      config.transport.connection !== undefined
        ? config.transport.connection
        : new RSocketWebSocketClient(
            {
              url: config.transport.url ? config.transport.url : 'ws://',
              wsCreator: config.transport.wsCreator,
            },
            BufferEncoders,
          );

    const requestHandler = new RequestHandlingRSocket();
    const responder = new UnwrappingRSocket(requestHandler);

    const metadata = encodeFrame({
      type: FrameTypes.DESTINATION_SETUP,
      majorVersion: null,
      minorVersion: null,
      group: config.setup.group,
      tags,
      accessKey,
      accessToken,
    });

    const finalConfig: ClientConfig<Buffer, Buffer> = {
      setup: {
        keepAlive,
        lifetime,
        metadata,
        connectionId,
        additionalFlags
      },
      transport,
      responder,
    };

    if (config.responder !== undefined) {
      finalConfig.responder = config.responder;
    }

    if (config.serializers !== undefined) {
      finalConfig.serializers = config.serializers;
    }

    const client = new RpcClient(finalConfig);

    return new Proteus(config.setup.group, tags, client, requestHandler);
  }
}

// Helper function to generate GUID-ish IDs, should a user not provide one
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
