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
	readBytes,
	getByteLength,
	bufferFromByteBuffer,
	bytebufferFromBuffer,
	readUint64,
	writeUint64

} from './Utilities.js'

const ACCESS_TOKEN_SIZE = 20;
const ACCESS_KEY_SIZE = 8; // supposed to be Long size

export function serializeQuerySetupFrame(frame: QuerySetupFrame) : Buffer {

	const accessTokenLength = getByteLength(frame.accessToken);
	invariant(
	accessTokenLength === ACCESS_TOKEN_SIZE,
	'QuerySetupFrame: invalid access token size: found %s, expected %s',
	accessTokenLength,
	ACCESS_TOKEN_SIZE,
	);

	const buffer = ByteBuffer.allocate(
	  FRAME_HEADER_SIZE +
      ACCESS_TOKEN_SIZE +
      ACCESS_KEY_SIZE
	);
	
	let offset = writeHeader(buffer, frame);

	offset = writeBytes(
		frame.accessToken,
		buffer,
		offset
	);

	offset = writeUint64(buffer, frame.accessKey, offset);

	return buffer;
}

export function deserializeQuerySetupFrame(
	buffer: ByteBuffer,
	flags: number,
	seqId: Long) : QuerySetupFrame{
	
	let offset = FRAME_HEADER_SIZE;

	const accessToken = readBytes(buffer, offset, ACCESS_TOKEN_SIZE);
	offset += ACCESS_TOKEN_SIZE;

	const accessKey = readUint64(buffer, offset);

	return {
		type: FRAME_TYPES.QUERY_SETUP,
		flags,
		accessToken,
		seqId,
		accessKey
	};
}
