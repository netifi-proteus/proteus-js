
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
  createByteBuffer,
  readUint64,
  writeUint64,
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


const CLUSTER_ID_SIZE = 8; // supposed to be Long value
const ROUTER_ID_SIZE = 8; // supposed to be Long value

export function serializeRouterSetupFrame(
      frame: RouterSetupFrame
      ): Buffer {
	
	const authTokenLength = BufferEncoder.byteLength(frame.authToken);

	const buffer = createByteBuffer(
		FRAME_HEADER_SIZE +
		CLUSTER_ID_SIZE +
		ROUTER_ID_SIZE +
		authTokenLength
	);
  	
  	let offset = writeHeader(buffer, frame);

	writeUint64(buffer, frame.clusterId, offset);
	offset += 8;
	
	writeUint64(buffer, frame.routerId, offset);
	offset += 8;
  	
	offset = BufferEncoder.encode(
		frame.authToken,
		buffer,
		offset,
		offset + authTokenLength
	);

	return buffer;
}

export function deserializeRouterSetupFrame(
	buffer: Buffer,
	flags: number,
	seqId: number) : RouterSetupFrame {

	let offset = FRAME_HEADER_SIZE;

	const clusterId = readUint64(buffer, offset);
	offset += CLUSTER_ID_SIZE;

	const routerId = readUint64(buffer, offset);
	offset += ROUTER_ID_SIZE;

	const authToken = BufferEncoder.decode(buffer, offset) //decode to end of Buffer

	return {
		type: FRAME_TYPES.ROUTER_SETUP,
		flags,
		clusterId,
		routerId,
		seqId,
		authToken
	};
}