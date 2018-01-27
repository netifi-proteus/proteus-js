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
  BufferEncoder,
  UTF8Encoder,
  createByteBuffer
} from 'rsocket-core';

import {FRAME_TYPES} from './ProteusFrame';

import {
	FRAME_HEADER_SIZE,
	ENCRYPTED
} from './ProteusBinaryFraming';


import invariant from 'fbjs/lib/invariant';

import {
	writeHeader
} from './Utilities.js'

const PUBLIC_KEY_SIZE = 32;
const TOKEN_SIZE = 4;

export function serializeRequestSharedSecretFrame(
      frame: RequestSharedSecretFrame
      ): ByteBuffer {

	const buffer = createByteBuffer(
		FRAME_HEADER_SIZE +
		PUBLIC_KEY_SIZE +
		TOKEN_SIZE
	);
  	
  	let offset = writeHeader(buffer, frame);

	offset = BufferEncoder.encode(
		frame.publicKey,
		buffer,
		offset,
		offset + PUBLIC_KEY_SIZE,
    );
	
	offset = BufferEncoder.encode(
	    frame.token,
	    buffer,
	    offset,
	    offset + TOKEN_SIZE,
	);

	return buffer;
}

export function deserializeRequestSharedSecretFrame(
	ByteBuffer: ByteBuffer,
	flags: number,
	seqId: number) : RequestSharedSecretFrame {

	let offset = FRAME_HEADER_SIZE;

	const publicKey = BufferEncoder.decode(ByteBuffer, offset, offset+PUBLIC_KEY_SIZE);
	offset += PUBLIC_KEY_SIZE;

	const token = ByteBuffer.slice(offset, offset+TOKEN_SIZE);
	
	return {
		type: FRAME_TYPES.REQUEST_SHARED_SECRET,
		flags,
		publicKey,
		seqId,
		token
	};
}