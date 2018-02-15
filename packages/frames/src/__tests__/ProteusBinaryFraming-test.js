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

import {
  serializeSharedSecretFrame
} from '../SharedSecretFrame';

import {
  serializeAuthenticationRequestFrame
} from '../AuthenticationRequestFrame';

import {
  serializeAuthenticationResponseFrame
} from '../AuthenticationResponseFrame';

import {
  serializeRouteFrame
} from '../RouteFrame';

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

describe('SharedSecretFrameTest', () => {
  it('testEncode', () => {
    const publicKey = ByteBuffer.wrap(randomBytes(32).buffer);
    const sharedSecret = ByteBuffer.wrap(randomBytes(16).buffer);
    const token = ByteBuffer.wrap(randomBytes(4).buffer);
    const frame = {
      type: 0x05,
      flags: 0,
      publicKey,
      sharedSecret,
      seqId: Long.UZERO,
      token
    };

    const buffer = serializeSharedSecretFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});

describe('AuthenticationRequestFrameTest', () => {
  it('testEncode', () => {
    const accessToken = ByteBuffer.fromBinary(randomBytes(20));
    const accessKey = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const frame = {
      type: 0x09,
      flags: 0,
      accessToken,
      seqId: Long.UZERO,
      accessKey
    };

    const buffer = serializeAuthenticationRequestFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});

describe('AuthenticationResponseFrameTest', () => {
  it('testEncode', () => {
    const accountId = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
    const count = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
    const sessionToken = ByteBuffer.fromBinary(randomBytes(20));
    const frame = {
      type: 0x0A,
      flags: 0,
      accountId,
      count,
      seqId: Long.UZERO,
      sessionToken
    };

    const buffer = serializeAuthenticationResponseFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});

/*
type: 0x06,
  flags: number,
  hasToken: boolean,
  hasMetadata: boolean,
  token: number,
  fromAccessKey: number,
  fromDestination: string,
  seqId: Long,
  route: ?Encodable,
  wrappedMetadata: ?Encodable,*/

describe('RouteFrameTest', () => {
  it('testNoMetadataNoTokenEncode', () => {
    const fromAccessKey = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const fromDestination = "A very nice destination";
    const route = ByteBuffer.fromBinary(randomBytes(32).buffer);
    const frame = {
      type: 0x06,
      flags: 0,
      hasToken: false,
      hasMetadata: false,
      fromAccessKey,
      fromDestination,
      seqId: Long.UZERO,
      route
    };

    const buffer = serializeRouteFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });

  it('testNoMetadataHasTokenEncode', () => {
    const fromAccessKey = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const fromDestination = "A very nice destination";
    const route = ByteBuffer.fromBinary(randomBytes(32).buffer);
    const token = randomBytes(4).readUInt32BE(0);
    const frame = {
      type: 0x06,
      flags: 0b00000100,
      hasToken: true,
      hasMetadata: false,
      fromAccessKey,
      fromDestination,
      token,
      seqId: Long.UZERO,
      route
    };

    const buffer = serializeRouteFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });

  it('testHasMetadataNoTokenEncode', () => {
    const fromAccessKey = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const fromDestination = "A very nice destination";
    const route = ByteBuffer.fromBinary(randomBytes(32).buffer);
    const randomSize = Math.ceil(Math.random() * 2048);
    const wrappedMetadata = ByteBuffer.fromBinary(randomBytes(randomSize));
    const frame = {
      type: 0x06,
      flags: 0b01000000,
      hasToken: false,
      hasMetadata: true,
      fromAccessKey,
      fromDestination,
      wrappedMetadata,
      seqId: Long.UZERO,
      route
    };

    const buffer = serializeRouteFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });

  it('testHasMetadataHasTokenEncode', () => {
    const fromAccessKey = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const fromDestination = "A very nice destination";
    const route = ByteBuffer.fromBinary(randomBytes(32).buffer);
    const randomSize = Math.ceil(Math.random() * 2048);
    const wrappedMetadata = ByteBuffer.fromBinary(randomBytes(randomSize));
    const token = randomBytes(4).readUInt32BE(0);
    const frame = {
      type: 0x06,
      flags: 0b01000100,
      hasToken: true,
      hasMetadata: true,
      fromAccessKey,
      fromDestination,
      token,
      wrappedMetadata,
      seqId: Long.UZERO,
      route
    };

    const buffer = serializeRouteFrame(frame);
    expect(deserializeFrame(buffer)).to.deep.equal(frame);
  });
});