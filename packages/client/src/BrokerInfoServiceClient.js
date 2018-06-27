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

import type {ReactiveSocket, Encodable} from 'rsocket-types';

import {Flowable, Single} from 'rsocket-flowable';

import {Broker, Group, Destination, Event} from './proteus/broker_info_pb';

import {Empty} from 'proteus-js-core';

import {encodeProteusMetadata} from 'proteus-js-frames';

export default class BrokerInfoServiceClient {
  _rs: ReactiveSocket<Buffer, Buffer>;
  _group: string;
  _destination: string;

  constructor(
    rs: ReactiveSocket<Buffer, Buffer>,
    group: string,
    destination: string,
  ) {
    this._rs = rs;
    this._group = group;
    this._destination = destination;
  }

  brokers(message: Empty, metadata: Encodable): Flowable<Broker> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'Brokers',
      metadata,
    );
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Broker.deserializeBinary(payload.data);
      });
  }

  groups(message: Broker, metadata: Encodable): Flowable<Group> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'Groups',
      metadata,
    );
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Group.deserializeBinary(payload.data);
      });
  }

  destinations(message: Broker, metadata: Encodable): Flowable<Destination> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'Destinations',
      metadata,
    );
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Destination.deserializeBinary(payload.data);
      });
  }

  destinationsByBrokerAndGroup(
    message: Group,
    metadata: Encodable,
  ): Flowable<Destination> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'DestinationsByBrokerAndGroup',
      metadata,
    );
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Destination.deserializeBinary(payload.data);
      });
  }

  destinationsByGroup(
    message: Group,
    metadata: Encodable,
  ): Flowable<Destination> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'DestinationsByGroup',
      metadata,
    );
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Destination.deserializeBinary(payload.data);
      });
  }

  brokersWithGroup(message: Group, metadata: Encodable): Flowable<Broker> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'BrokersWithGroup',
      metadata,
    );
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Broker.deserializeBinary(payload.data);
      });
  }

  brokerWithDestination(
    message: Destination,
    metadata: Encodable,
  ): Single<Broker> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'BrokerWithDestination',
      metadata,
    );
    return this._rs
      .requestResponse({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Broker.deserializeBinary(payload.data);
      });
  }

  streamGroupEvents(message: Group, metadata: Encodable): Flowable<Event> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'StreamGroupEvents',
      metadata,
    );
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Event.deserializeBinary(payload.data);
      });
  }

  streamDestinationEvents(
    message: Group,
    metadata: Encodable,
  ): Flowable<Event> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'StreamDestinationEvents',
      metadata,
    );
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Event.deserializeBinary(payload.data);
      });
  }

  streamBrokerEvents(message: Empty, metadata: Encodable): Flowable<Event> {
    const dataBuf = Buffer.from(message.serializeBinary());
    const metadataBuf = encodeProteusMetadata(
      'io.netifi.proteus.broker.info.BrokerInfoService',
      'StreamBrokerEvents',
      metadata,
    );
    return this._rs
      .requestStream({
        data: dataBuf,
        metadata: metadataBuf,
      })
      .map(payload => {
        if (payload.data == null) {
          throw new Error('data is null');
        }
        return Event.deserializeBinary(payload.data);
      });
  }
}
