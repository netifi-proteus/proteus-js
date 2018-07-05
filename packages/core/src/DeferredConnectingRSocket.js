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

import type {ReactiveSocket, Payload, ConnectionStatus} from 'rsocket-types';

import {Flowable, Single} from 'rsocket-flowable';

import {FrameTypes, encodeFrame} from 'proteus-js-frames';

export default class DeferredConnectingRSocket
  implements ReactiveSocket<Buffer, Buffer> {
  _connect: () => Single<ReactiveSocket<Buffer, Buffer>>;
  // _error: Error;
  // _connected: boolean;
  // _connecting: Single<ReactiveSocket<Buffer, Buffer>>;
  // _connection: ReactiveSocket<Buffer, Buffer>;
  _transformer: (Payload<Buffer, Buffer>) => Payload<Buffer, Buffer>;

  constructor(
    transformer: (Payload<Buffer, Buffer>) => Payload<Buffer, Buffer>,
    connect: () => Single<ReactiveSocket<Buffer, Buffer>>,
  ) {
    this._transformer = transformer;
    this._connect = connect;
  }

  static broadcast(
    fromGroup: string,
    fromDestination: string,
    toGroup: string,
    connect: () => Single<ReactiveSocket<Buffer, Buffer>>,
  ): ReactiveSocket<Buffer, Buffer> {
    return new DeferredConnectingRSocket(payload => {
      const metadata = encodeFrame({
        type: FrameTypes.BROADCAST,
        majorVersion: null,
        minorVersion: null,
        fromGroup,
        fromDestination,
        toGroup,
        metadata: payload.metadata || Buffer.alloc(0),
      });
      return {
        data: payload.data,
        metadata,
      };
    }, connect);
  }

  static group(
    fromGroup: string,
    fromDestination: string,
    toGroup: string,
    connect: () => Single<ReactiveSocket<Buffer, Buffer>>,
  ): ReactiveSocket<Buffer, Buffer> {
    return new DeferredConnectingRSocket(payload => {
      const metadata = encodeFrame({
        type: FrameTypes.GROUP,
        majorVersion: null,
        minorVersion: null,
        fromGroup,
        fromDestination,
        toGroup,
        metadata: payload.metadata || Buffer.alloc(0),
      });
      return {
        data: payload.data,
        metadata,
      };
    }, connect);
  }

  static destination(
    fromGroup: string,
    fromDestination: string,
    toGroup: string,
    toDestination: string,
    connect: () => Single<ReactiveSocket<Buffer, Buffer>>,
  ): ReactiveSocket<Buffer, Buffer> {
    return new DeferredConnectingRSocket(payload => {
      const metadata = encodeFrame({
        type: FrameTypes.DESTINATION,
        majorVersion: null,
        minorVersion: null,
        fromGroup,
        fromDestination,
        toGroup,
        toDestination,
        metadata: payload.metadata || Buffer.alloc(0),
      });
      return {
        data: payload.data,
        metadata,
      };
    }, connect);
  }

  fireAndForget(payload: Payload<Buffer, Buffer>): void {
    const transformedPayload = this._transformer(payload);
    this._connect().subscribe({
      onComplete: connection => connection.fireAndForget(transformedPayload),
    });
  }

  requestResponse(
    payload: Payload<Buffer, Buffer>,
  ): Single<Payload<Buffer, Buffer>> {
    const self = this;
    return new Single(subscriber => {
      this._connect().subscribe({
        onComplete: connection => {
          try {
            connection
              .requestResponse(self._transformer(payload))
              .subscribe(subscriber);
          } catch (error) {
            subscriber.onError(error);
          }
        },
        onError: error => {
          subscriber.onError(error);
        },
      });
    });
  }

  requestStream(
    payload: Payload<Buffer, Buffer>,
  ): Flowable<Payload<Buffer, Buffer>> {
    const self = this;
    return new Flowable(subscriber => {
      this._connect().subscribe({
        onComplete: connection => {
          try {
            connection
              .requestStream(self._transformer(payload))
              .subscribe(subscriber);
          } catch (error) {
            subscriber.onError(error);
          }
        },
        onError: error => {
          subscriber.onError(error);
        },
      });
    });
  }

  requestChannel(
    payloads: Flowable<Payload<Buffer, Buffer>>,
  ): Flowable<Payload<Buffer, Buffer>> {
    const self = this;
    return new Flowable(subscriber => {
      this._connect().subscribe({
        onComplete: connection => {
          connection
            .requestChannel(payloads.map(payload => self._transformer(payload)))
            .subscribe(subscriber);
        },
        onError: error => {
          subscriber.onError(error);
        },
      });
    });
  }

  metadataPush(payload: Payload<Buffer, Buffer>): Single<void> {
    const self = this;
    return new Single(subscriber => {
      this._connect().subscribe({
        onComplete: connection => {
          try {
            connection
              .metadataPush(self._transformer(payload))
              .subscribe(subscriber);
          } catch (error) {
            subscriber.onError(error);
          }
        },
        onError: error => {
          subscriber.onError(error);
        },
      });
    });
  }

  close(): void {
    this._connect().subscribe({
      onComplete: connection => {
        connection.close();
      },
    });
  }

  connectionStatus(): Flowable<ConnectionStatus> {
    return new Flowable(subscriber => {
      this._connect().subscribe({
        onComplete: connection => {
          connection.connectionStatus().subscribe(subscriber);
        },
        onError: error => {
          subscriber.onError(error);
        },
      });
    });
  }
}

// function establishConnection(
//   deferred: DeferredConnectingRSocket,
// ): Single<ReactiveSocket<Buffer, Buffer>> {
//   if (deferred._connected) {
//     return Single.of(deferred._connection);
//   } else if (deferred._error) {
//     return Single.error(deferred._error);
//   } else if (deferred._connecting) {
//     return deferred._connecting;
//   } else {
//     deferred._connecting = deferred._connect().flatMap(connection => {
//       deferred._connection = connection;
//       deferred._connected = true;
//       return Single.of(connection);
//     });
//     return deferred._connecting;
//   }
// }
