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

import {
  deserializeDestinationSetupFrame,
  serializeDestinationSetupFrame
} from './DestinationSetupFrame.js';

import {
  deserializeRouterSetupFrame,
  serializeRouterSetupFrame
} from './RouterSetupFrame.js';

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
    case FRAME_TYPES.ROUTER_SETUP:
      return deserializeRouterSetupFrame(buffer, flags, seqId);
    default:
      invariant(
        false,
        'ProteusBinaryFraming: Unsupported frame type `%s`.',
        type,
      );
  }
}