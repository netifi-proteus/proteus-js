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

import {FRAME_TYPES} from './ProteusFrame';

import {
	FRAME_HEADER_SIZE,
	ENCRYPTED
} from './ProteusBinaryFraming';


import ByteBuffer from 'bytebuffer';

import invariant from 'fbjs/lib/invariant';

import {
  writeHeader,
  writeBytes,
  writeString,
  readBytes,
  readString,
  getByteLength,
  getStringByteLength,
  bufferFromByteBuffer,
  bytebufferFromBuffer,
  readUint64,
  writeUint64

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
    frame.publicKey != null ? getByteLength(frame.publicKey) : 0;
  if (encrypted) {
    invariant(
      publicKeyLength === PUBLIC_KEY_SIZE,
      'DestinationSetupFrame: invalid public key size: found %s, expected %s',
      publicKeyLength,
      PUBLIC_KEY_SIZE,
    );
  }

  const accessTokenLength = getByteLength(frame.accessToken);
  invariant(
    accessTokenLength === ACCESS_TOKEN_SIZE,
    'DestinationSetupFrame: invalid access token size: found %s, expected %s',
    accessTokenLength,
    ACCESS_TOKEN_SIZE,
  );

  const destinationLength = getStringByteLength(frame.destination);
  invariant(
    destinationLength <= 255,
    'DestinationSetupFrame: destination is longer then 255 characters',
  );

  const groupLength = getStringByteLength(frame.group);
  invariant(
    groupLength <= 255,
    'DestinationSetupFrame: group is longer then 255 characters',
  );

  const buffer = ByteBuffer.allocate(
    FRAME_HEADER_SIZE +
      DESTINATION_SETUP_FIXED_SIZE +
      (encrypted ? PUBLIC_KEY_SIZE : 0) +
      ACCESS_TOKEN_SIZE +
      destinationLength +
      groupLength,
  );
  let offset = writeHeader(buffer, frame);

  if (encrypted && frame.publicKey != null) {
    offset = writeBytes(
      frame.publicKey,
      buffer,
      offset
    );
  }

  offset = writeBytes(
    frame.accessToken,
    buffer,
    offset
  );

  writeUint64(buffer, frame.accessKey, offset);
  offset += 8;

  buffer.writeUInt8(destinationLength, offset);
  offset += 1;

  offset = writeString(
    frame.destination,
    buffer,
    offset
  );

  buffer.writeUInt8(groupLength, offset);
  offset += 1;

  offset = writeString(
    frame.group,
    buffer,
    offset
  );

  return buffer;
}

/**
 * Reads a SETUP frame from the buffer and returns it.
 */
export function deserializeDestinationSetupFrame(
  buffer: Buffer,
  flags: number,
  seqId: Long,
): DestinationSetupFrame {
  let offset = FRAME_HEADER_SIZE;

  let publicKey;
  const encrypted = (flags & ENCRYPTED) !== 0;
  if (encrypted) {
    publicKey = readBytes(buffer, offset, PUBLIC_KEY_SIZE);
    offset += PUBLIC_KEY_SIZE;
  }

  const accessToken = readBytes(
    buffer,
    offset,
    ACCESS_TOKEN_SIZE,
  );
  offset += ACCESS_TOKEN_SIZE;

  const accessKey = readUint64(buffer, offset);
  offset += 8;

  const destinationLength = buffer.readUInt8(offset);
  offset += 1;
  const destination = readString(
    buffer,
    offset,
    destinationLength
  );
  offset += destinationLength;

  const groupLength = buffer.readUInt8(offset);
  offset += 1;
  const group = readString(buffer, offset, groupLength);
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