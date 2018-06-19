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

import type {ReactiveSocket, Payload, Encodable} from 'rsocket-types';

import {Flowable, Single} from 'rsocket-flowable';

import {Broker} from './proteus/broker_info_pb';

import {Empty} from './proteus/core_pb';

import {
  FrameTypes,
  encodeFrame,
  encodeProteusMetadata,
} from 'proteus-js-frames';

export default class BrokerInfoServiceClient {
  _rs: ReactiveSocket<Buffer, Buffer>;

  constructor(rs: ReactiveSocket<Buffer, Buffer>) {
    this._rs = rs;
  }

  brokers(message: Empty, metadata: Encodable): Flowable<Broker> {
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'Brokers',
      metadata,
    );
    const wrappedMetadata = encodeFrame({
      type: FrameTypes.GROUP,
      majorVersion: null,
      minorVersion: null,
      fromGroup: 'group',
      fromDestination: 'destination',
      toGroup: 'com.netifi.proteus.brokerServices',
      metadata: metadataBuf,
    });
    const dataBuf = Buffer.from(message.serializeBinary());
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: wrappedMetadata,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        // TODO: https://github.com/google/protobuf/issues/1319
        return Broker.deserializeBinary(Array.from(payload.data));
      });
  }
}
