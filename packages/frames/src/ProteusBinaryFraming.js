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
  SharedSecretFrame,
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

import {
  serializeQuerySetupFrame,
  deserializeQuerySetupFrame
} from './QuerySetupFrame';

import {
  serializeRequestSharedSecretFrame,
  deserializeRequestSharedSecretFrame
} from './RequestSharedSecretFrame';

import {
  serializeSharedSecretFrame,
  deserializeSharedSecretFrame
} from './SharedSecretFrame';

import {
  serializeAuthenticationRequestFrame,
  deserializeAuthenticationRequestFrame
} from './AuthenticationRequestFrame';

import {
  serializeAuthenticationResponseFrame,
  deserializeAuthenticationResponseFrame
} from './AuthenticationResponseFrame';

import {
  serializeRouteFrame,
  deserializeRouteFrame
} from './RouteFrame';

import invariant from 'fbjs/lib/invariant';
import {
  BufferEncoder,
  UTF8Encoder,
  createBuffer,
  writeUint64,
} from 'rsocket-core';

import {readUint64} from './Utilities';

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
export function deserializeFrame(buffer: ByteBuffer): Frame {
  const typeAndFlags = buffer.readInt32(0);
  const type = (typeAndFlags & FRAME_TYPE_MASK) >>> 24;
  const flags = (typeAndFlags & FLAGS_MASK) >>> 16;
  const majorVersion = (typeAndFlags & MAJOR_VERSION_MASK) >>> 8;
  const minorVersion = typeAndFlags & MINOR_VERSION_MASK;
  const seqId = readUint64(buffer, 4);

  switch (type) {
    case FRAME_TYPES.DESTINATION_SETUP:
      return deserializeDestinationSetupFrame(buffer, flags, seqId);
    case FRAME_TYPES.ROUTER_SETUP:
      return deserializeRouterSetupFrame(buffer, flags, seqId);
    case FRAME_TYPES.QUERY_SETUP:
      return deserializeQuerySetupFrame(buffer, flags, seqId);
    case FRAME_TYPES.REQUEST_SHARED_SECRET:
      return deserializeRequestSharedSecretFrame(buffer, flags, seqId);
    case FRAME_TYPES.SHARED_SECRET:
      return deserializeSharedSecretFrame(buffer, flags, seqId);
    case FRAME_TYPES.ROUTE:
      return deserializeRouteFrame(buffer, flags, seqId);
    case FRAME_TYPES.AUTH_REQUEST:
      return deserializeAuthenticationRequestFrame(buffer, flags, seqId);
    case FRAME_TYPES.AUTH_RESPONSE:
      return deserializeAuthenticationResponseFrame(buffer, flags, seqId);
    default:
      invariant(
        false,
        'ProteusBinaryFraming: Unsupported frame type `%s`.',
        type,
      );
  }
}