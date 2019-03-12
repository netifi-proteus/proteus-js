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
 */

import {expect} from 'chai';
import {describe, it} from 'mocha';

import ipaddr from 'ipaddr.js';

import {encodeFrame, decodeFrame, FrameTypes} from '../frames';
import ConnectionId from '../frames/ConnectionId';
import AdditionalFlags from '../frames/AdditionalFlags';

describe('BROKER_SETUP', () => {
  it('serializes BROKER_SETUP frames', () => {
    const brokerId = 'brokerId';
    const clusterId = 'clusterId';
    const accessKey = Number.MAX_SAFE_INTEGER;
    const accessToken = Buffer.from([0x0a, 0x0b, 0x0c]);
    const input = {
      type: FrameTypes.BROKER_SETUP,
      brokerId,
      clusterId,
      accessKey,
      accessToken,
    };

    const buffer = encodeFrame(input);
    const frame = decodeFrame(buffer);

    expect(input.type).to.equal(frame.type);
    expect(input.brokerId).to.equal(frame.brokerId);
    expect(input.clusterId).to.equal(frame.clusterId);
    expect(input.accessKey).to.equal(frame.accessKey);
    expect(input.accessToken).to.deep.equal(frame.accessToken);
  });
});

describe('DESTINATION_SETUP', () => {
  it('serializes DESTINATION_SETUP frames', () => {
    const inetAddress = ipaddr.parse('127.0.0.1');
    const group = 'group';
    const accessKey = Number.MAX_SAFE_INTEGER;
    const accessToken = Buffer.from([0x0a, 0x0b, 0x0c]);
    const tags = {key: 'value'};
    const input = {
      type: FrameTypes.DESTINATION_SETUP,
      inetAddress,
      group,
      accessKey,
      accessToken,
      tags,
      connectionId: new ConnectionId('abc'),
      additionalFlags: new AdditionalFlags({
        public: true,
      }),
    };

    const buffer = encodeFrame(input);
    const frame = decodeFrame(buffer);

    expect(input.type).to.equal(frame.type);
    expect(input.inetAddress.toString()).to.equal(frame.inetAddress.toString());
    expect(input.group).to.equal(frame.group);
    expect(input.connectionId.bytes()).to.deep.equal(
      frame.connectionId.bytes(),
    );
    expect(input.accessKey).to.equal(frame.accessKey);
    expect(input.accessToken).to.deep.equal(frame.accessToken);
    expect(input.tags).to.deep.equal(frame.tags);
    expect(input.additionalFlags.sum()).to.equal(frame.additionalFlags.sum());
  });

  it('handles optional inetAddress in DESTINATION_SETUP frames', () => {
    const group = 'group';
    const accessKey = Number.MAX_SAFE_INTEGER;
    const accessToken = Buffer.from([0x0a, 0x0b, 0x0c]);
    const tags = {key: 'value'};
    const input = {
      type: FrameTypes.DESTINATION_SETUP,
      group,
      accessKey,
      accessToken,
      tags,
      connectionId: new ConnectionId('abc'),
      additionalFlags: new AdditionalFlags({public: false}),
    };

    const buffer = encodeFrame(input);
    const frame = decodeFrame(buffer);

    expect(input.type).to.equal(frame.type);
    expect(frame.inetAddress).to.equal(null);
    expect(input.group).to.equal(frame.group);
    expect(input.connectionId.bytes()).to.deep.equal(
      frame.connectionId.bytes(),
    );
    expect(input.accessKey).to.equal(frame.accessKey);
    expect(input.accessToken).to.deep.equal(frame.accessToken);
    expect(input.tags).to.deep.equal(frame.tags);
    expect(input.additionalFlags.sum()).to.equal(frame.additionalFlags.sum());
  });
});

describe('GROUP', () => {
  it('serializes GROUP frames', () => {
    const group = 'group';
    const metadata = Buffer.from([0x0a, 0x0b, 0x0c]);
    const tags = {key: 'value'};
    const input = {
      type: FrameTypes.GROUP,
      group,
      metadata,
      tags,
    };

    const buffer = encodeFrame(input);
    const frame = decodeFrame(buffer);

    expect(input.type).to.equal(frame.type);
    expect(input.group).to.equal(frame.group);
    expect(input.metadata).to.deep.equal(frame.metadata);
    expect(input.tags).to.deep.equal(frame.tags);
  });
});

describe('BROADCAST', () => {
  it('serializes BROADCAST frames', () => {
    const group = 'group';
    const metadata = Buffer.from([0x0a, 0x0b, 0x0c]);
    const tags = {key: 'value'};
    const input = {
      type: FrameTypes.BROADCAST,
      group,
      metadata,
      tags,
    };

    const buffer = encodeFrame(input);
    const frame = decodeFrame(buffer);

    expect(input.type).to.equal(frame.type);
    expect(input.group).to.equal(frame.group);
    expect(input.metadata).to.deep.equal(frame.metadata);
    expect(input.tags).to.deep.equal(frame.tags);
  });
});

describe('SHARD', () => {
  it('serializes SHARD frames', () => {
    const group = 'group';
    const shardKey = Buffer.from([0x0a, 0x0b, 0x0c]);
    const metadata = Buffer.from([0x0d, 0x0e, 0x0f]);
    const tags = {key: 'value'};
    const input = {
      type: FrameTypes.SHARD,
      group,
      shardKey,
      metadata,
      tags,
    };

    const buffer = encodeFrame(input);
    const frame = decodeFrame(buffer);

    expect(input.type).to.equal(frame.type);
    expect(input.group).to.equal(frame.group);
    expect(input.shardKey).to.deep.equal(frame.shardKey);
    expect(input.metadata).to.deep.equal(frame.metadata);
    expect(input.tags).to.deep.equal(frame.tags);
  });
});
