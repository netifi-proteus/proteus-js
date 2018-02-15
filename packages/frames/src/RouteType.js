
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

export type RouteType = {|
  hasDestination: boolean,
  encodedType: number
|};

export const UNDEFINED : RouteType = {
  encodedType: 0x00,
  hasDestination: false
};

export const STREAM_ID_ROUTE : RouteType = {
  encodedType: 0x01,
  hasDestination: true
};

export const STREAM_GROUP_ROUTE : RouteType = {
  encodedType: 0x02,
  hasDestination: false
};

export const PRESENCE_ID_QUERY : RouteType = {
  encodedType: 0x03,
  hasDestination: true
};

export const PRESENCE_GROUP_QUERY : RouteType = {
  encodedType: 0x04,
  hasDestination: false
};

export const routeTypeForId = {
    0: UNDEFINED,
    1: STREAM_ID_ROUTE,
    2: STREAM_GROUP_ROUTE,
    3: PRESENCE_ID_QUERY,
    4: PRESENCE_GROUP_QUERY
};