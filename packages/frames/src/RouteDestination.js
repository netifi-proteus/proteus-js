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
import {
	routeTypeForId,
	UNDEFINED
} from './RouteType';

const LAST_MASK = 0b10000000;
const REMOVE_FLAG = 0b01111111;
const ROUTE_TYPE_SIZE = 1;
const ACCOUNT_ID_SIZE = 8;
const DESTINATION_LENGTH_SIZE = 1;
const GROUP_LENGTH_SIZE = 1;


export type RouteDestination = {|
	routeType: RouteType,
	accountId: Long,
	destination: ?String,
	group: String
|}

export function serializeRouteDestination( routeType: RouteType, accountId: Long, destination: String, group: String) : ByteBuffer {

	let buffer = ByteBuffer.allocate(computeLength(routeType, destination, group));

	const hasDestination = routeType.hasDestination;
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
    const encodedType = routeType.encodedType;

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

export function deserializeRouteDestination(buffer: ByteBuffer): RouteDestination {

	let offset = 0;

	const routeTypeId = buffer.readUint8(offset) & REMOVE_FLAG;
	const routeType = routeTypeForId[routeTypeId] || UNDEFINED;
	offset += ROUTE_TYPE_SIZE;


	const accountId = readUint64(buffer, offset);
	offset += ACCOUNT_ID_SIZE;

	let destination;
	if (routeType.hasDestination) {

      const destinationLength = buffer.readUint8(destinationLength, offset);
	  offset += DESTINATION_LENGTH_SIZE;

	  destination = readString(buffer, offset, destinationLength);
	  offset += destinationLength;
    }

    const groupLength = buffer.readUint8(offset);
	offset += GROUP_LENGTH_SIZE;

	const group = readString(buffer, offset, groupLength);

	let result = {
		routeType,
		accountId,
		group
	}

	if(routeType.hasDestination){
		result.destination = destination;
	}

	return result;
}

// export function accountId(buffer: ByteBuffer): Long {
// 	return readUint64(buffer, ROUTE_TYPE_SIZE);
// }

// export function destination(buffer: ByteBuffer): String {
// 	int offset = ROUTE_TYPE_SIZE + ACCOUNT_ID_SIZE;
// 	int length = BitUtil.toUnsignedInt(byteBuf.getByte(offset));
// 	offset += DESTINATION_LENGTH_SIZE;
// 	return (String) byteBuf.getCharSequence(offset, length, StandardCharsets.US_ASCII);
// }

// export function routeType(buffer: ByteBuffer): RouteType {
// 	int id = byteBuf.getByte(0) & REMOVE_FLAG;
// 	return RouteType.from(id);
// }

// export function group(buffer: ByteBuffer): String {
// 	int offset = ROUTE_TYPE_SIZE + ACCOUNT_ID_SIZE;

// 	if (routeType(byteBuf).hasDestination()) {
// 	  int destinationLength = BitUtil.toUnsignedInt(byteBuf.getByte(offset));
// 	  offset += DESTINATION_LENGTH_SIZE + destinationLength;
// 	}

// 	int length = BitUtil.toUnsignedInt(byteBuf.getByte(offset));
// 	offset += GROUP_LENGTH_SIZE;

// 	return (String) byteBuf.getCharSequence(offset, length, StandardCharsets.US_ASCII);
// }

export function computeLength(routeType: RouteType, destination: String, group: String): number {
	invariant(
	    !routeType.hasDestination || (destination && destination.length >0 && destination.length <= 255),
	    'RouteDestination: destination is required for this route type',
	 );
return ROUTE_TYPE_SIZE
    + ACCOUNT_ID_SIZE
    + (routeType.hasDestination ? destination.length + DESTINATION_LENGTH_SIZE : 0)
    + group.length
    + GROUP_LENGTH_SIZE;
}