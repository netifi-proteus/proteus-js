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
import {readUInt64BE} from 'rsocket-core';
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

describe('DestinationSetupFrameTest', () => {
  it('testEncodeWithEncryption', () => {
    const publicKey = randomBytes(32);
    const accessToken = randomBytes(20);
    const accessKey = randomBytes(4).readUInt32BE(0);
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
    const clusterId = randomBytes(32);
    const routerId = randomBytes(32);
    const authToken = randomBytes(64);
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
