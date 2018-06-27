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
import type {PayloadSerializers} from 'rsocket-core/build/RSocketSerialization';
import {BufferEncoders} from 'rsocket-core';
import {ProteusClient} from 'proteus-js-core';
import invariant from 'fbjs/lib/invariant';
import {DeferredConnectingRSocket} from '../../core/dist';

const RSocketWebSocketClient = require('rsocket-websocket-client').default;

export type ProteusConfig<D, M> = {|
  serializers?: PayloadSerializers<D, M>,
  setup: {|
    group: string,
    destination?: string,
    keepAlive?: number,
    lifetime?: number,
    accessKey?: number,
    accessToken?: Buffer,
  |},
  transport: {|
    url?: string,
    //encoder?: Encoders<*>, *** Right now only BufferEncoder is supported for WebSocket so do not allow passing it in if using a URL ***
    connection?: DuplexConnection,
  |},
  responder?: Responder<D, M>,
|};

export default class Proteus<D, M> {
  _client: ProteusClient<D, M>;
  _group: string;
  _destination: string;
  _connect: () => Single<ReactiveSocket<D, M>>;

  constructor(proteusClient: ProteusClient<D, M>) {
    this._client = proteusClient;
    this._group = proteusClient.group();
    this._destination = proteusClient.destination();
    this._connect = proteusClient.connect.bind(proteusClient);
  }

  group(group: string): ReactiveSocket<D, M> {
    return DeferredConnectingRSocket.group(
      this._group,
      this._destination,
      group,
      this._connect,
    );
  }

  destination(destination: string, group: string): ReactiveSocket<D, M> {
    return DeferredConnectingRSocket.destination(
      this._group,
      this._destination,
      group,
      destination,
      this._connect,
    );
  }

  close(): void {
    this._client.close();
  }

  static create(config: ProteusConfig<D, M>): Proteus<D, M> {
    invariant(
      config && config.setup && config.transport,
      'Proteus: Falsey config is invalid. At minimum transport config, group, access key, and access token are required.',
    );

    invariant(
      config.transport.connection || config.transport.url,
      'Proteus: Transport config must supply a connection or a URL',
    );

    const finalConfig = {setup: {group: config.setup.group}};

    if (config.serializers !== undefined) {
      finalConfig.serializers = config.serializers;
    }

    //default to GUID-y destination ID
    finalConfig.setup.destination = config.setup.destination
      ? config.setup.destination
      : uuidv4();
    finalConfig.setup.keepAlive =
      config.setup.keepAlive !== undefined
        ? config.setup.keepAlive
        : 60000 /* 60s in ms */;
    finalConfig.setup.lifetime =
      config.setup.lifetime !== undefined
        ? config.setup.lifetime
        : 360000 /* 360s in ms */;
    finalConfig.setup.accessKey = config.setup.accessKey;
    finalConfig.setup.accessToken = config.setup.accessToken;

    if (config.transport.connection) {
      finalConfig.transport = config.transport.connection;
    } else {
      finalConfig.transport = new RSocketWebSocketClient(
        {
          url: config.transport.url,
        },
        BufferEncoders,
      );
    }

    if (config.responder !== undefined) {
      finalConfig.responder = config.responder;
    }

    const client = new ProteusClient(finalConfig);

    return new Proteus(client);
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
