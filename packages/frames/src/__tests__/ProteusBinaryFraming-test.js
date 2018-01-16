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
import {readUInt64BE, toBuffer} from 'rsocket-core';
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
    const publicKey = randomBytes(32);
    const accessToken = randomBytes(20);
    const accessKey = toBuffer(randomBytes(4));
    const frame = {
      type: 0x01,
      flags: ENCRYPTED,
      publicKey,
      accessToken,
      seqId: 0,
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
    const clusterId = randomBytes(8);
    const routerId = randomBytes(8);
    const authToken = toBuffer(randomBytes(20));
    const frame = {
      type: 0x02,
      flags: 0,
      clusterId,
      routerId,
      authToken,
      seqId: 0
    };

    const buffer = serializeRouterSetupFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});

describe('QuerySetupFrameTest', () => {
  it('testEncode', () => {
    const accessToken = randomBytes(20);
    const accessKey = randomBytes(8);
    const frame = {
      type: 0x03,
      flags: 0,
      accessToken,
      seqId: 0,
      accessKey
    };

    const buffer = serializeQuerySetupFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});

describe('RequestSharedSecretFrameTest', () => {
  it('testEncode', () => {
    const publicKey = randomBytes(32);
    const token = toBuffer(randomBytes(20));
    const frame = {
      type: 0x04,
      flags: 0,
      publicKey,
      seqId: 0,
      token
    };

    const buffer = serializeRequestSharedSecretFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});
