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
import {Single, Flowable} from 'rsocket-flowable';
import type {PayloadSerializers} from 'rsocket-core/build/RSocketSerialization';
import {BufferEncoders} from 'rsocket-core';
import {
  ProteusClient,
  DeferredConnectingRSocket,
  RequestHandlingRSocket,
  UnwrappingRSocket,
} from 'proteus-js-core';
import type {ClientConfig} from 'proteus-js-core';
import invariant from 'fbjs/lib/invariant';

const RSocketWebSocketClient = require('rsocket-websocket-client').default;

export type ProteusConfig = {|
  serializers?: PayloadSerializers<Buffer, Buffer>,
  setup: {|
    group: string,
    destination?: string,
    keepAlive?: number,
    lifetime?: number,
    accessKey: number,
    accessToken: string,
  |},
  transport: {|
    url?: string,
    //encoder?: Encoders<*>, *** Right now only BufferEncoder is supported for WebSocket so do not allow passing it in if using a URL ***
    connection?: DuplexConnection,
  |},
  responder?: Responder<Buffer, Buffer>,
|};

export default class Proteus {
  _client: ProteusClient<Buffer, Buffer>;
  _group: string;
  _destination: string;
  _connect: () => Single<ReactiveSocket<Buffer, Buffer>>;
  _requestHandler: RequestHandlingRSocket;

  constructor(
    proteusClient: ProteusClient<Buffer, Buffer>,
    requestHandler: RequestHandlingRSocket,
  ) {
    this._client = proteusClient;
    this._group = proteusClient.group();
    this._destination = proteusClient.destination();
    this._connect = proteusClient.connect.bind(proteusClient);
    this._requestHandler = requestHandler;
  }

  group(group: string): ReactiveSocket<Buffer, Buffer> {
    return DeferredConnectingRSocket.group(
      this._group,
      this._destination,
      group,
      this._connect,
    );
  }

  destination(
    destination: string,
    group: string,
  ): ReactiveSocket<Buffer, Buffer> {
    return DeferredConnectingRSocket.destination(
      this._group,
      this._destination,
      group,
      destination,
      this._connect,
    );
  }

  addService(service: string, handler: Responder<Buffer, Buffer>): void {
    this._requestHandler.addService(service, handler);
  }

  close(): void {
    this._client.close();
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

    //default to GUID-y destination ID
    const destination =
      config.setup.destination !== undefined
        ? config.setup.destination
        : uuidv4();
    const keepAlive =
      config.setup.keepAlive !== undefined
        ? config.setup.keepAlive
        : 60000 /* 60s in ms */;
    const lifetime =
      config.setup.lifetime !== undefined
        ? config.setup.lifetime
        : 360000 /* 360s in ms */;
    const accessKey = config.setup.accessKey;
    const accessToken = Buffer.from(config.setup.accessToken, 'base64');

    const transport: DuplexConnection =
      config.transport.connection !== undefined
        ? config.transport.connection
        : new RSocketWebSocketClient(
            {
              url: config.transport.url ? config.transport.url : 'ws://',
            },
            BufferEncoders,
          );

    const requestHandler = new RequestHandlingRSocket();
    const responder = new UnwrappingRSocket(requestHandler);

    const finalConfig: ClientConfig<Buffer, Buffer> = {
      setup: {
        group: config.setup.group,
        destination,
        keepAlive,
        lifetime,
        accessKey,
        accessToken,
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

    const client = new ProteusClient(finalConfig);

    return new Proteus(client, requestHandler);
  }
}

//Helper function to generate GUID-ish IDs, should a user not provide one
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
