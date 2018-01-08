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

import type {
  Frame,
  DestinationSetupFrame,
  RouterSetupFrame,
  QuerySetupFrame,
  RequestSharedSecretFrame,
  SharedSecredFrame,
  RouteFrame,
  QueryDestinationAvailFrame,
  DestinationAvailResultFrame,
  AuthenticationRequestFrame,
  AuthenticationResponseFrame,
  InfoSetupFrame,
  RouterInfoFrame,
  RouterInfoSnapshotFrame,
  RouterInfoResultFrame,
  ExtensionFrame,
} from './ProteusTypes';
import {FRAME_TYPES} from './ProteusFrame';

import invariant from 'fbjs/lib/invariant';
import {
  BufferEncoder,
  UTF8Encoder,
  createBuffer,
  readUInt64BE,
  writeUInt64BE,
} from 'rsocket-core';

/**
 * Frame header is:
 * - flags (uint32 = 4)
 * - seqId (uint64 = 8)
 */
export const FRAME_HEADER_SIZE = 12;

/**
 * Protocol Version
 */
export const MAJOR_VERSION = 0;
export const MINOR_VERSION = 1;

/**
 * Flag Fields masks
 */
export const USER_DATA_PRESENT = 0b10000000;
export const METADATA_PRESENT = 0b01000000;
export const ENCRYPTED = 0b00100000;
export const BROADCAST = 0b00010000;
export const API_CALL = 0b00001000;
export const TOKEN = 0b00000100;

/**
 * Frame Header field masks
 */
export const FRAME_TYPE_MASK = 0b01111111000000000000000000000000;
export const FLAGS_MASK = 0b00000000111111110000000000000000;
export const MAJOR_VERSION_MASK = 0b00000000000000001111111100000000;
export const MINOR_VERSION_MASK = 0b00000000000000000000000011111111;

/**
 * Write the header of the frame into the buffer.
 */
function writeHeader(buffer: Buffer, frame: Frame): number {
  const header =
    (frame.type << 24) |
    (frame.flags << 16) |
    (MAJOR_VERSION << 8) |
    MINOR_VERSION;

  let offset = buffer.writeInt32BE(header, 0);

  return writeUInt64BE(buffer, frame.seqId, offset);
}

/*function frameType(buffer: Buffer): number {
  return (buffer.readInt32BE(0) & FRAME_TYPE_MASK) >>> 24;
}

function flags(buffer: Buffer): number {
  return (buffer.readInt32BE(0) & FLAGS_MASK) >>> 16;
}

function majorVersion(buffer: Buffer): number {
  return (buffer.readInt32BE(0) & MAJOR_VERSION_MASK) >>> 8;
}

function minorVersion(buffer: Buffer): number {
  return buffer.readInt32BE(0) & MINOR_VERSION_MASK;
}

function encodeFlags(
  userData: boolean, metadata: boolean, encrypted: boolean, apiCall: boolean, token: boolean) {
  const flags =
    (userData ? USER_DATA_PRESENT : 0)
    | (metadata ? METADATA_PRESENT : 0)
    | (encrypted ? ENCRYPTED : 0)
    | (apiCall ? API_CALL : 0)
    | (token ? TOKEN : 0);

  return flags;
}

function hasData(buffer: Buffer): boolean {
  return (flags(buffer) & USER_DATA_PRESENT) === USER_DATA_PRESENT;
}

function hasMetadata(buffer: Buffer): boolean {
  return (flags(buffer) & METADATA_PRESENT) === METADATA_PRESENT;
}

function isEncrypted(buffer: Buffer): boolean {
  return (flags(buffer) & ENCRYPTED) !== 0;
}

function isBroadcast(buffer: Buffer): boolean {
  return (flags(buffer) & BROADCAST) !== 0;
}

function isApiCall(buffer: Buffer): boolean {
  return (flags(buffer) & API_CALL) !== 0;
}

function isToken(buffer: Buffer): boolean {
  return (flags(buffer) & TOKEN) === TOKEN;
}

function seqId(buffer: Buffer): number {
  return readUInt64BE(buffer, 4);
}*/

/**
 * Read a frame from the buffer.
 */
export function deserializeFrame(buffer: Buffer): Frame {
  const typeAndFlags = buffer.readInt32BE(0);
  const type = (typeAndFlags & FRAME_TYPE_MASK) >>> 24;
  const flags = (typeAndFlags & FLAGS_MASK) >>> 16;
  const majorVersion = (typeAndFlags & MAJOR_VERSION_MASK) >>> 8;
  const minorVersion = typeAndFlags & MINOR_VERSION_MASK;
  const seqId = readUInt64BE(buffer, 4);

  switch (type) {
    case FRAME_TYPES.DESTINATION_SETUP:
      return deserializeDestinationSetupFrame(buffer, flags, seqId);
    default:
      invariant(
        false,
        'ProteusBinaryFraming: Unsupported frame type `%s`.',
        type,
      );
  }
}

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
function deserializeDestinationSetupFrame(
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
