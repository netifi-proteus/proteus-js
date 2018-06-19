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

'use strict';

import type {
  ConnectionStatus,
  DuplexConnection,
  Payload,
  ReactiveSocket,
  SetupFrame,
  Responder,
} from 'rsocket-types';
import type {PayloadSerializers} from 'rsocket-core/build/RSocketSerialization';

import {Flowable, Single, every} from 'rsocket-flowable';
import invariant from 'fbjs/lib/invariant';

import {CONNECTION_STREAM_ID, FLAGS, FRAME_TYPES} from 'rsocket-core';
import {MAJOR_VERSION, MINOR_VERSION} from 'rsocket-core/build/RSocketVersion';
import {createClientMachine} from 'rsocket-core/build/RSocketMachine';

import {FrameTypes, encodeFrame} from 'proteus-js-frames';

export type ClientConfig<D, M> = {|
  serializers?: PayloadSerializers<D, M>,
  setup: {|
    group: string,
    destination: string,
    keepAlive: number,
    lifetime: number,
    accessKey: number,
    accessToken: Buffer,
  |},
  transport: DuplexConnection,
  responder?: Responder<D, M>,
|};

/**
 * ProteusClient: A client in an RSocket connection that will communicates with
 * the peer via the given transport client. Provides methods for establishing a
 * connection and initiating the RSocket interactions:
 * - fireAndForget()
 * - requestResponse()
 * - requestStream()
 * - requestChannel()
 * - metadataPush()
 */
export default class ProteusClient<D, M> {
  _cancel: ?() => void;
  _config: ClientConfig<D, M>;
  _connection: ?Single<ReactiveSocket<D, M>>;
  _socket: ?ProteusClientSocket<D, M>;

  constructor(config: ClientConfig<D, M>) {
    this._cancel = null;
    this._config = config;
    this._connection = null;
    this._socket = null;
  }

  close(): void {
    this._config.transport.close();
  }

  connect(): Single<ReactiveSocket<D, M>> {
    invariant(
      !this._connection,
      'ProteusClient: Unexpected call to connect(), already connected.',
    );
    this._connection = new Single(subscriber => {
      const transport = this._config.transport;
      let subscription;
      transport.connectionStatus().subscribe({
        onNext: status => {
          if (status.kind === 'CONNECTED') {
            subscription && subscription.cancel();
            subscriber.onComplete(
              new ProteusClientSocket(this._config, transport),
            );
          } else if (status.kind === 'ERROR') {
            subscription && subscription.cancel();
            subscriber.onError(status.error);
          } else if (status.kind === 'CLOSED') {
            subscription && subscription.cancel();
            subscriber.onError(new Error('ProteusClient: Connection closed.'));
          }
        },
        onSubscribe: _subscription => {
          subscriber.onSubscribe(() => _subscription.cancel());
          subscription = _subscription;
          subscription.request(Number.MAX_SAFE_INTEGER);
        },
      });
      transport.connect();
    });
    return this._connection;
  }
}

/**
 * @private
 */
class ProteusClientSocket<D, M> implements ReactiveSocket<D, M> {
  _machine: ReactiveSocket<D, M>;

  constructor(config: ClientConfig<D, M>, connection: DuplexConnection) {
    this._machine = createClientMachine(
      connection,
      subscriber => connection.receive().subscribe(subscriber),
      config.serializers,
      config.responder,
    );

    // Send SETUP
    connection.sendOne(this._buildSetupFrame(config));

    // Send KEEPALIVE frames
    const {keepAlive} = config.setup;
    const keepAliveFrames = every(keepAlive).map(() => ({
      data: null,
      flags: FLAGS.RESPOND,
      lastReceivedPosition: 0,
      streamId: CONNECTION_STREAM_ID,
      type: FRAME_TYPES.KEEPALIVE,
    }));
    connection.send(keepAliveFrames);
  }

  fireAndForget(payload: Payload<D, M>): void {
    this._machine.fireAndForget(payload);
  }

  requestResponse(payload: Payload<D, M>): Single<Payload<D, M>> {
    return this._machine.requestResponse(payload);
  }

  requestStream(payload: Payload<D, M>): Flowable<Payload<D, M>> {
    return this._machine.requestStream(payload);
  }

  requestChannel(payloads: Flowable<Payload<D, M>>): Flowable<Payload<D, M>> {
    return this._machine.requestChannel(payloads);
  }

  metadataPush(payload: Payload<D, M>): Single<void> {
    return this._machine.metadataPush(payload);
  }

  close(): void {
    this._machine.close();
  }

  connectionStatus(): Flowable<ConnectionStatus> {
    return this._machine.connectionStatus();
  }

  _buildSetupFrame(config: ClientConfig<D, M>): SetupFrame {
    const {
      group,
      destination,
      keepAlive,
      lifetime,
      accessKey,
      accessToken,
    } = config.setup;
    const metadata = encodeFrame({
      type: FrameTypes.DESTINATION_SETUP,
      majorVersion: null,
      minorVersion: null,
      destination,
      group,
      accessKey,
      accessToken,
    });
    return {
      flags: FLAGS.METADATA,
      keepAlive,
      lifetime,
      majorVersion: MAJOR_VERSION,
      minorVersion: MINOR_VERSION,
      metadataMimeType: 'application/binary',
      metadata,
      dataMimeType: 'application/binary',
      data: undefined,
      resumeToken: null,
      streamId: CONNECTION_STREAM_ID,
      type: FRAME_TYPES.SETUP,
    };
  }
}
