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
	writeHeader,
	writeBytes,
	writeJSNumber,
	readBytes,
	readJSNumber,
	getByteLength,
	bufferFromByteBuffer,
	bytebufferFromBuffer,
	readUint64,
	writeUint64

} from './Utilities.js'

import ByteBuffer from 'bytebuffer';

import {FRAME_TYPES} from './ProteusFrame';

import {
	FRAME_HEADER_SIZE,
	ENCRYPTED
} from './ProteusBinaryFraming';


import invariant from 'fbjs/lib/invariant';

const ACCOUNT_ID_SIZE = 8;
const COUNT_SIZE = 8;

export function serializeAuthenticationResponseFrame(
      frame: AuthenticationResponseFrame
      ): ByteBuffer {

  	const sessionTokenSize = getByteLength(frame.sessionToken);

	const buffer = ByteBuffer.allocate(
		FRAME_HEADER_SIZE +
		ACCOUNT_ID_SIZE +
		COUNT_SIZE +
		sessionTokenSize
	);
  	
  	let offset = writeHeader(buffer, frame);

	offset = writeJSNumber(
		buffer,
		frame.accountId,
		offset
    );

    offset = writeJSNumber(
    	buffer,
    	frame.count,
    	offset
	);
	
	offset = writeBytes(
	    frame.sessionToken,
	    buffer,
	    offset
	);

	return buffer;
}

export function deserializeAuthenticationResponseFrame(
	buffer: ByteBuffer,
	flags: number,
	seqId: Long) : AuthenticationResponseFrame {

	let offset = FRAME_HEADER_SIZE;

	const accountId = readJSNumber(buffer, offset);
	offset += ACCOUNT_ID_SIZE;

	const count = readJSNumber(buffer, offset);
	offset += COUNT_SIZE;

	const sessionToken = readBytes(buffer, offset);
	
	return {
		type: FRAME_TYPES.AUTH_RESPONSE,
		flags,
		accountId,
		count,
		sessionToken,
		seqId
	};
}