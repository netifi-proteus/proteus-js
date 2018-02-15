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

import bufferfer from 'bufferfer';

import invariant from 'fbjs/lib/invariant';

import {
	hasMetadata,
	isToken,
	writeHeader,
	writeBytes,
	writeString,
	readBytes,
	readString,
	getByteLength,
	getStringByteLength,
	bufferFrombufferfer,
	bufferferFromBuffer,
	readUint64,
	writeUint64

} from './Utilities.js'

import RouteType from './RouteType';

const LAST_MASK = 0b10000000;
const REMOVE_FLAG = 0b01111111;
const ROUTE_TYPE_SIZE = 1;
const ACCOUNT_ID_SIZE = 8;
const DESTINATION_LENGTH_SIZE = 1;
const GROUP_LENGTH_SIZE = 1;


export function serializeRouteDestination( buffer: ByteBuffer, routeType: RouteType, accountId: Long, destination: String, group: String) : ByteBuffer {

	const hasDestination = routeType.hasDestination();
    const destinationLength = hasDestination ? destination.length : 0;
    const groupLength = group.length;

    invariant(
	    destinationLength <= 255,
	    'RouteDestination: destination is longer then 255 characters',
	 );

    invariant(
	    group <= 255,
	    'RouteDestination: group is longer then 255 characters',
	 );

    let offset = 0;
    const encodedType = routeType.getEncodedType();

    buffer.writeUint8(encodedType, offset);
    offset += ROUTE_TYPE_SIZE;

    offset = writeUint64(buffer, accountId, offset);
    
    if (hasDestination) {

      buffer.writeUint8(destinationLength, offset);
	  offset += DESTINATION_LENGTH_SIZE;

	  offset = writeString(destination, buffer, offset);
    }

    buffer.writeUint8(groupLength, offset);
	offset += GROUP_LENGTH_SIZE;

	offset = writeString(group, buffer, offset);

    return buffer;
}