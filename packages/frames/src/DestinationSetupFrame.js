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

import {
  BufferEncoder,
  UTF8Encoder,
  createBuffer,
  readUInt64BE,
  writeUInt64BE,
} from 'rsocket-core';

import {FRAME_TYPES} from './ProteusFrame';

import {
	FRAME_HEADER_SIZE,
	ENCRYPTED
} from './ProteusBinaryFraming';


import invariant from 'fbjs/lib/invariant';

import {
	writeHeader
} from './Utilities.js'

/**
 * Writes a DESTINATION_SETUP frame into a new buffer and returns it.
 *
 * Prefix size is:
 * - access key (uint64 = 8)
 * - destination length (uint8 = 1)
 * - group length (uint8 = 1)
 */
const DESTINATION_SETUP_FIXED_SIZE = 10;
const PUBLIC_KEY_SIZE = 32;
const ACCESS_TOKEN_SIZE = 20;

export function serializeDestinationSetupFrame(
  frame: DestinationSetupFrame,
): Buffer {
  const encrypted = (frame.flags & ENCRYPTED) !== 0;
  const publicKeyLength =
    frame.publicKey != null ? BufferEncoder.byteLength(frame.publicKey) : 0;
  if (encrypted) {
    invariant(
      publicKeyLength === PUBLIC_KEY_SIZE,
      'ProteusBinaryFraming: invalid public key size: found %s, expected %s',
      publicKeyLength,
      PUBLIC_KEY_SIZE,
    );
  }

  const accessTokenLength = BufferEncoder.byteLength(frame.accessToken);
  invariant(
    accessTokenLength === ACCESS_TOKEN_SIZE,
    'ProteusBinaryFraming: invalid access token size: found %s, expected %s',
    accessTokenLength,
    ACCESS_TOKEN_SIZE,
  );

  const destinationLength = UTF8Encoder.byteLength(frame.destination);
  invariant(
    destinationLength <= 255,
    'ProteusBinaryFraming: destination is longer then 255 characters',
  );

  const groupLength = UTF8Encoder.byteLength(frame.group);
  invariant(
    groupLength <= 255,
    'ProteusBinaryFraming: group is longer then 255 characters',
  );

  const buffer = createBuffer(
    FRAME_HEADER_SIZE +
      DESTINATION_SETUP_FIXED_SIZE +
      (encrypted ? PUBLIC_KEY_SIZE : 0) +
      ACCESS_TOKEN_SIZE +
      destinationLength +
      groupLength,
  );
  let offset = writeHeader(buffer, frame);

  if (encrypted && frame.publicKey != null) {
    offset = BufferEncoder.encode(
      frame.publicKey,
      buffer,
      offset,
      offset + publicKeyLength,
    );
  }

  offset = BufferEncoder.encode(
    frame.accessToken,
    buffer,
    offset,
    offset + accessTokenLength,
  );

  offset = writeUInt64BE(buffer, frame.accessKey, offset);

  offset = buffer.writeUInt8(destinationLength, offset);
  offset = UTF8Encoder.encode(
    frame.destination,
    buffer,
    offset,
    offset + destinationLength,
  );

  offset = buffer.writeUInt8(groupLength, offset);
  offset = UTF8Encoder.encode(
    frame.group,
    buffer,
    offset,
    offset + groupLength,
  );

  return buffer;
}

/**
 * Reads a SETUP frame from the buffer and returns it.
 */
export function deserializeDestinationSetupFrame(
  buffer: Buffer,
  flags: number,
  seqId: number,
): DestinationSetupFrame {
  let offset = FRAME_HEADER_SIZE;

  let publicKey;
  const encrypted = (flags & ENCRYPTED) !== 0;
  if (encrypted) {
    publicKey = BufferEncoder.decode(buffer, offset, offset + PUBLIC_KEY_SIZE);
    offset += PUBLIC_KEY_SIZE;
  }

  const accessToken = BufferEncoder.decode(
    buffer,
    offset,
    offset + ACCESS_TOKEN_SIZE,
  );
  offset += ACCESS_TOKEN_SIZE;

  const accessKey = readUInt64BE(buffer, offset);
  offset += 8;

  const destinationLength = buffer.readUInt8(offset);
  offset += 1;
  const destination = UTF8Encoder.decode(
    buffer,
    offset,
    offset + destinationLength,
  );
  offset += destinationLength;

  const groupLength = buffer.readUInt8(offset);
  offset += 1;
  const group = UTF8Encoder.decode(buffer, offset, offset + groupLength);
  offset += groupLength;

  return {
    type: FRAME_TYPES.DESTINATION_SETUP,
    flags,
    publicKey,
    accessToken,
    seqId,
    accessKey,
    destination,
    group,
  };
}