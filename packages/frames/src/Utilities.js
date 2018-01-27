
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
  readUint64,
  writeUint64
} from 'rsocket-core';

import ByteBuffer from 'bytebuffer';
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


export function frameType(buffer: ByteBuffer): number {
  return (buffer.readInt32(0) & FRAME_TYPE_MASK) >>> 24;
}

export function flags(buffer: ByteBuffer): number {
  return (buffer.readInt32(0) & FLAGS_MASK) >>> 16;
}

export function majorVersion(buffer: ByteBuffer): number {
  return (buffer.readInt32(0) & MAJOR_VERSION_MASK) >>> 8;
}

export function minorVersion(buffer: ByteBuffer): number {
  return buffer.readInt32(0) & MINOR_VERSION_MASK;
}

export function encodeFlags(
  userData: boolean, metadata: boolean, encrypted: boolean, apiCall: boolean, token: boolean) {
  const eflags =
    (userData ? USER_DATA_PRESENT : 0)
    | (metadata ? METADATA_PRESENT : 0)
    | (encrypted ? ENCRYPTED : 0)
    | (apiCall ? API_CALL : 0)
    | (token ? TOKEN : 0);

  return eflags;
}

export function hasData(buffer: ByteBuffer): boolean {
  return (flags(buffer) & USER_DATA_PRESENT) === USER_DATA_PRESENT;
}

export function hasMetadata(buffer: ByteBuffer): boolean {
  return (flags(buffer) & METADATA_PRESENT) === METADATA_PRESENT;
}

export function isEncrypted(buffer: ByteBuffer): boolean {
  return (flags(buffer) & ENCRYPTED) !== 0;
}

export function isBroadcast(buffer: ByteBuffer): boolean {
  return (flags(buffer) & BROADCAST) !== 0;
}

export function isApiCall(buffer: ByteBuffer): boolean {
  return (flags(buffer) & API_CALL) !== 0;
}

export function isToken(buffer: ByteBuffer): boolean {
  return (flags(buffer) & TOKEN) === TOKEN;
}

export function seqId(buffer: ByteBuffer): Long {
  return readUint64(buffer, 4);
}

/**
 * Write the header of the frame into the buffer.
 */
export function writeHeader(buffer: ByteBuffer, frame: Frame): number {
  const header =
    (frame.type << 24) |
    (frame.flags << 16) |
    (MAJOR_VERSION << 8) |
    MINOR_VERSION;

  buffer.writeInt32(header, 0);

  writeUint64(buffer, frame.seqId, 4);
  return FRAME_HEADER_SIZE;
}