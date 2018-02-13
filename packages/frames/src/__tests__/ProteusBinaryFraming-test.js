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

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {randomBytes} from 'crypto';
import ByteBuffer from 'bytebuffer';
import Long from 'long';
import {
  ENCRYPTED,
  deserializeFrame,
} from '../ProteusBinaryFraming';

import {
  serializeDestinationSetupFrame
} from '../DestinationSetupFrame';

import {
  serializeRouterSetupFrame
} from '../RouterSetupFrame';

import {
  serializeQuerySetupFrame
} from '../QuerySetupFrame';

import {
  serializeRequestSharedSecretFrame
} from '../RequestSharedSecretFrame';

describe('DestinationSetupFrameTest', () => {
  it('testEncodeWithEncryption', () => {
    const publicKey = ByteBuffer.fromBinary(randomBytes(32));
    const accessToken = ByteBuffer.fromBinary(randomBytes(20));
    const accessKey = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const frame = {
      type: 0x01,
      flags: ENCRYPTED,
      publicKey,
      accessToken,
      seqId: Long.UZERO,
      accessKey,
      destination: 'dest',
      group: 'group',
    };

    const buffer = serializeDestinationSetupFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});

describe('RouterSetupFrameTest', () => {
  it('testEncode', () => {
    const clusterId = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const routerId = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const authToken = ByteBuffer.fromBinary(randomBytes(20));
    const frame = {
      type: 0x02,
      flags: 0,
      clusterId,
      routerId,
      authToken,
      seqId: Long.UZERO
    };

    const buffer = serializeRouterSetupFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});

describe('QuerySetupFrameTest', () => {
  it('testEncode', () => {
    const accessToken = ByteBuffer.fromBinary(randomBytes(20));
    const accessKey = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const frame = {
      type: 0x03,
      flags: 0,
      accessToken,
      seqId: Long.UZERO,
      accessKey
    };

    const buffer = serializeQuerySetupFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});

describe('RequestSharedSecretFrameTest', () => {
  it('testEncode', () => {
    const publicKey = ByteBuffer.wrap(randomBytes(32).buffer);
    const token = ByteBuffer.wrap(randomBytes(4).buffer);
    const frame = {
      type: 0x04,
      flags: 0,
      publicKey,
      seqId: Long.UZERO,
      token
    };

    const buffer = serializeRequestSharedSecretFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});
