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

import type {Encodable} from 'rsocket-types';

import {UTF8Encoder, BufferEncoder, createBuffer} from 'rsocket-core';

/**
 * Version
 */
export const VERSION = 1;

export const VERSION_SIZE = 2;
export const SERVICE_LENGTH_SIZE = 2;
export const METHOD_LENGTH_SIZE = 2;

export function encodeProteusMetadata(
  service: string,
  method: string,
  metadata: Encodable,
): Buffer {
  const serviceLength = UTF8Encoder.byteLength(service);
  const methodLength = UTF8Encoder.byteLength(method);
  const metadataLength = BufferEncoder.byteLength(metadata);

  const buffer = createBuffer(
    VERSION_SIZE +
      SERVICE_LENGTH_SIZE +
      serviceLength +
      METHOD_LENGTH_SIZE +
      methodLength +
      metadataLength,
  );

  let offset = buffer.writeUInt16BE(VERSION, 0);

  offset = buffer.writeUInt16BE(serviceLength, offset);
  offset = UTF8Encoder.encode(service, buffer, offset, offset + serviceLength);

  offset = buffer.writeUInt16BE(methodLength, offset);
  offset = UTF8Encoder.encode(method, buffer, offset, offset + methodLength);

  BufferEncoder.encode(metadata, buffer, offset, offset + metadataLength);

  return buffer;
}

export function getVersion(buffer: Buffer): number {
  return buffer.readUInt16BE(0);
}

export function getService(buffer: Buffer): string {
  let offset = VERSION_SIZE;

  const serviceLength = buffer.readUInt16BE(offset);
  offset += SERVICE_LENGTH_SIZE;

  return UTF8Encoder.decode(buffer, offset, offset + serviceLength);
}

export function getMethod(buffer: Buffer): string {
  let offset = VERSION_SIZE;

  const serviceLength = buffer.readUInt16BE(offset);
  offset += SERVICE_LENGTH_SIZE + serviceLength;

  const methodLength = buffer.readUInt16BE(offset);
  offset += METHOD_LENGTH_SIZE;

  return UTF8Encoder.decode(buffer, offset, offset + methodLength);
}

export function getMetadata(buffer: Buffer): Buffer {
  let offset = VERSION_SIZE;

  const serviceLength = buffer.readUInt16BE(offset);
  offset += SERVICE_LENGTH_SIZE + serviceLength;

  const methodLength = buffer.readUInt16BE(offset);
  offset += METHOD_LENGTH_SIZE + methodLength;

  return BufferEncoder.decode(buffer, offset, buffer.length);
}
