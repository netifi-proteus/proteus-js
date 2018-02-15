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
	bufferFromByteBuffer,
	bytebufferFromBuffer,
	readUint64,
	writeUint64

} from './Utilities.js'

const ACCESS_KEY_SIZE = 8;
const ROUTE_LENGTH_SIZE = 4;
const DESTINATION_LENGTH_SIZE = 1;
const WRAPPED_METADATA_LENGTH_SIZE = 4;
const TOKEN_SIZE = 4;


export function serializeRouteFrame(frame: RouteFrame) : Buffer {


/*
type: 0x06,
  flags: number,
  hasToken: boolean,
  hasMetadata: boolean,
  token: number,
  fromAccessKey: number,
  fromDestination: string,
  seqId: Long,
  route: ?Encodable,
  wrappedMetadata: ?Encodable,*/

	const destinationLength = getStringByteLength(frame.fromDestination);
	  invariant(
	    destinationLength <= 255,
	    'DestinationSetupFrame: destination is longer then 255 characters',
	 );

	const routeLength = getByteLength(frame.route);
	const wrappedMetadataLength = frame.hasMetadata ? getByteLength(frame.wrappedMetadata) : 0;

	const buffer = ByteBuffer.allocate(
	  FRAME_HEADER_SIZE +
	  TOKEN_SIZE +
      ACCESS_KEY_SIZE +
	  destinationLength +
      DESTINATION_LENGTH_SIZE +
      ROUTE_LENGTH_SIZE +
      routeLength +
      WRAPPED_METADATA_LENGTH_SIZE + 
      wrappedMetadataLength
	);
	
	let offset = writeHeader(buffer, frame);

	if(frame.hasToken){
		buffer.writeUint32(frame.token, offset);
		offset += TOKEN_SIZE;
	}

	offset = writeUint64(buffer, frame.fromAccessKey, offset);

	buffer.writeUint8(destinationLength, offset);
	offset += DESTINATION_LENGTH_SIZE;

	offset = writeString(frame.fromDestination, buffer, offset);

	buffer.writeUint32(routeLength, offset);
	offset += ROUTE_LENGTH_SIZE;

	offset = writeBytes(frame.route, buffer, offset);

	if (frame.hasMetadata) {
      buffer.writeUint32(wrappedMetadataLength, offset);
      offset += WRAPPED_METADATA_LENGTH_SIZE;

      offset = writeBytes(frame.wrappedMetadata, buffer, offset);
	}

	return buffer;
}

export function deserializeRouteFrame(
	buffer: ByteBuffer,
	flags: number,
	seqId: Long) : RouteFrame{
	
	let offset = FRAME_HEADER_SIZE;
	
	const hasToken = isToken(buffer);
	let token;
	if(hasToken){
		token = buffer.readUint32(offset);
		offset += TOKEN_SIZE;
	}

	const fromAccessKey = readUint64(buffer, offset);
	offset += ACCESS_KEY_SIZE;

	const destinationLength = buffer.readUint8(offset);
	offset += DESTINATION_LENGTH_SIZE;

	const fromDestination = readString(buffer, offset, destinationLength);
	offset += destinationLength;

	const routeLength = buffer.readUint32(offset);
	offset += ROUTE_LENGTH_SIZE;

	const route = readBytes(buffer, offset, routeLength);
	offset += routeLength;

	const hasMd = hasMetadata(buffer);
	let wrappedMetadataLength;
	let wrappedMetadata;
	if (hasMd) {
      
      wrappedMetadataLength = buffer.readUint32(offset);
      offset += WRAPPED_METADATA_LENGTH_SIZE;

      wrappedMetadata = readBytes(buffer, offset, wrappedMetadataLength);
	}

	var resultFrame = {
		type: FRAME_TYPES.ROUTE,
		flags,
		hasToken,
  		hasMetadata: hasMd,
  		fromAccessKey,
  		fromDestination,
  		route,
		seqId
	};

	if(hasMd){
		resultFrame.wrappedMetadata = wrappedMetadata;
	}

	if(hasToken){
		resultFrame.token = token;
	}

	return resultFrame;
}
