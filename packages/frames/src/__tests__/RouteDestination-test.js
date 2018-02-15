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

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {randomBytes} from 'crypto';
import ByteBuffer from 'bytebuffer';
import Long from 'long';

import RouteType from '../RouteType';

import {
  routeTypeForId,
  UNDEFINED,
  STREAM_ID_ROUTE,
  STREAM_GROUP_ROUTE,
  PRESENCE_ID_QUERY,
  PRESENCE_GROUP_QUERY
  } from '../RouteType';

  import {
    serializeRouteDestination,
    deserializeRouteDestination
  } from '../RouteDestination'

describe('RouteDestination Tests', () => {
  it('Undefined type serializes and deserializes clean', () => {
    let destination;
    const groupLength = Math.floor(255 * Math.random());
    const group = Math.random().toString(36).substring(groupLength);
    const accountId = Long.fromBits(randomBytes(4).readUInt32BE(0), randomBytes(4).readUInt32BE(0), true);
    const expected = {
      routeType: UNDEFINED,
      accountId,
      //destination, no destination for UNDEFINED
      group,
    };

    const buffer = serializeRouteDestination(expected.routeType, accountId, destination, group);
    expect(deserializeRouteDestination(buffer)).to.deep.equal(expected);
  });
});