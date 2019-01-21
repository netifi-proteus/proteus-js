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

/* eslint-disable consistent-return, no-bitwise */

import type {DestinationSetupFrame} from './Types';

import {FrameTypes} from './Frame';

import {FRAME_HEADER_SIZE, encodeFrameHeader} from './FrameHeaderFlyweight';

import {UTF8Encoder, BufferEncoder, createBuffer} from 'rsocket-core';

import ipaddr from 'ipaddr.js';

import {
  readUInt64BE,
  writeUInt64BE,
} from 'rsocket-core/build/RSocketBufferUtils';

const INET_ADDRESS_LENGTH_SIZE = 4;
const GROUP_LENGTH_SIZE = 4;
const ACCESS_KEY_SIZE = 8;
const ACCESS_TOKEN_LENGTH_SIZE = 4;
const KEY_LENGTH_SIZE = 4;
const VALUE_LENGTH_SIZE = 4;

export function encodeDestinationSetupFrame(
  frame: DestinationSetupFrame,
): Buffer {
  const inetAddress = Buffer.from(frame.inetAddress.toByteArray());
  const inetAddressLength = BufferEncoder.byteLength(inetAddress);
  const groupLength = UTF8Encoder.byteLength(frame.group);
  const accessTokenLength = BufferEncoder.byteLength(frame.accessToken);
  const tagsLength = Object.entries(frame.tags).reduce((acc, [key, value]) => {
    const keyLength = UTF8Encoder.byteLength(key);
    const valueLength = UTF8Encoder.byteLength(value);
    return acc + KEY_LENGTH_SIZE + keyLength + VALUE_LENGTH_SIZE + valueLength;
  }, 0);

  const buffer = createBuffer(
    FRAME_HEADER_SIZE +
      INET_ADDRESS_LENGTH_SIZE +
      inetAddressLength +
      GROUP_LENGTH_SIZE +
      groupLength +
      ACCESS_KEY_SIZE +
      ACCESS_TOKEN_LENGTH_SIZE +
      accessTokenLength +
      tagsLength,
  );

  let offset = encodeFrameHeader(buffer, frame);

  offset = buffer.writeUInt32BE(inetAddressLength, offset);
  offset = BufferEncoder.encode(
    inetAddress,
    buffer,
    offset,
    offset + inetAddressLength,
  );

  offset = buffer.writeUInt32BE(groupLength, offset);
  offset = UTF8Encoder.encode(
    frame.group,
    buffer,
    offset,
    offset + groupLength,
  );

  offset = writeUInt64BE(buffer, frame.accessKey, offset);
  offset = buffer.writeUInt32BE(accessTokenLength, offset);
  offset = BufferEncoder.encode(
    frame.accessToken,
    buffer,
    offset,
    offset + accessTokenLength,
  );

  Object.entries(frame.tags).forEach(([key, value]) => {
    const keyLength = UTF8Encoder.byteLength(key);
    const valueLength = UTF8Encoder.byteLength(value);

    offset = buffer.writeUInt32BE(keyLength, offset);
    offset = UTF8Encoder.encode(key, buffer, offset, offset + keyLength);

    offset = buffer.writeUInt32BE(valueLength, offset);
    offset = UTF8Encoder.encode(value, buffer, offset, offset + valueLength);
  });

  return buffer;
}

export function decodeDestinationSetupFrame(
  buffer: Buffer,
  majorVersion: number,
  minorVersion: number,
): DestinationSetupFrame {
  let offset = FRAME_HEADER_SIZE;

  const inetAddressLength = buffer.readUInt32BE(offset);
  offset += INET_ADDRESS_LENGTH_SIZE;

  const inetAddress = BufferEncoder.decode(
    buffer,
    offset,
    offset + inetAddressLength,
  );
  offset += inetAddressLength;

  const groupLength = buffer.readUInt32BE(offset);
  offset += GROUP_LENGTH_SIZE;

  const group = UTF8Encoder.decode(buffer, offset, offset + groupLength);
  offset += groupLength;

  const accessKey = readUInt64BE(buffer, offset);
  offset += ACCESS_KEY_SIZE;

  const accessTokenLength = buffer.readUInt32BE(offset);
  offset += ACCESS_TOKEN_LENGTH_SIZE;

  const accessToken = BufferEncoder.decode(
    buffer,
    offset,
    offset + accessTokenLength,
  );
  offset += accessTokenLength;

  const tags = {};
  while (offset < buffer.length) {
    const keyLength = buffer.readUInt32BE(offset);
    offset += KEY_LENGTH_SIZE;

    const key = UTF8Encoder.decode(buffer, offset, offset + keyLength);
    offset += keyLength;

    const valueLength = buffer.readUInt32BE(offset);
    offset += VALUE_LENGTH_SIZE;

    const value = UTF8Encoder.decode(buffer, offset, offset + valueLength);
    offset += valueLength;

    tags[key] = value;
  }

  return {
    type: FrameTypes.DESTINATION_SETUP,
    majorVersion,
    minorVersion,
    inetAddress: ipaddr.fromByteArray(inetAddress),
    group,
    accessKey,
    accessToken,
    tags,
  };
}
