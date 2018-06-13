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

import type {DestinationSetupFrame} from './ProteusTypes';

import {FrameTypes} from './ProteusFrame';

import {FRAME_HEADER_SIZE, encodeFrameHeader} from './FrameHeaderFlyweight';

import {UTF8Encoder, BufferEncoder, createBuffer} from 'rsocket-core';

import {
  readUInt64BE,
  writeUInt64BE,
} from 'rsocket-core/build/RSocketBufferUtils';

const DESTINATION_LENGTH_SIZE = 4;
const GROUP_LENGTH_SIZE = 4;
const ACCESS_KEY_SIZE = 8;
const ACCESS_TOKEN_LENGTH_SIZE = 4;

export function encodeDestinationSetupFrame(
  frame: DestinationSetupFrame,
): Buffer {
  const destinationLength = UTF8Encoder.byteLength(frame.destination);
  const groupLength = UTF8Encoder.byteLength(frame.group);
  const accessTokenLength = BufferEncoder.byteLength(frame.accessToken);

  const buffer = createBuffer(
    FRAME_HEADER_SIZE +
      DESTINATION_LENGTH_SIZE +
      destinationLength +
      GROUP_LENGTH_SIZE +
      groupLength +
      ACCESS_KEY_SIZE +
      ACCESS_TOKEN_LENGTH_SIZE +
      accessTokenLength,
  );

  let offset = encodeFrameHeader(buffer, frame);

  offset = buffer.writeUInt32BE(destinationLength, offset);
  offset = UTF8Encoder.encode(
    frame.destination,
    buffer,
    offset,
    offset + destinationLength,
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
  BufferEncoder.encode(
    frame.accessToken,
    buffer,
    offset,
    offset + accessTokenLength,
  );

  return buffer;
}

export function decodeDestinationSetupFrame(
  buffer: Buffer,
  majorVersion: number,
  minorVersion: number,
): DestinationSetupFrame {
  let offset = FRAME_HEADER_SIZE;

  const destinationLength = buffer.readUInt32BE(offset);
  offset += DESTINATION_LENGTH_SIZE;

  const destination = UTF8Encoder.decode(
    buffer,
    offset,
    offset + destinationLength,
  );
  offset += destinationLength;

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

  return {
    type: FrameTypes.DESTINATION_SETUP,
    majorVersion,
    minorVersion,
    destination,
    group,
    accessKey,
    accessToken,
  };
}
