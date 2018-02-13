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
	readBytes,
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

const PUBLIC_KEY_SIZE = 32;
const TOKEN_SIZE = 4;

export function serializeRequestSharedSecretFrame(
      frame: RequestSharedSecretFrame
      ): ByteBuffer {

	const buffer = ByteBuffer.allocate(
		FRAME_HEADER_SIZE +
		PUBLIC_KEY_SIZE +
		TOKEN_SIZE
	);
  	
  	let offset = writeHeader(buffer, frame);

	offset = writeBytes(
		frame.publicKey,
		buffer,
		offset
    );
	
	offset = writeBytes(
	    frame.token,
	    buffer,
	    offset
	);

	return buffer;
}

export function deserializeRequestSharedSecretFrame(
	buffer: ByteBuffer,
	flags: number,
	seqId: Long) : RequestSharedSecretFrame {

	let offset = FRAME_HEADER_SIZE;

	const publicKey = readBytes(buffer, offset, PUBLIC_KEY_SIZE);
	offset += PUBLIC_KEY_SIZE;

	const token = readBytes(buffer, offset, TOKEN_SIZE);
	
	return {
		type: FRAME_TYPES.REQUEST_SHARED_SECRET,
		flags,
		publicKey,
		seqId,
		token
	};
}