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

export const FRAME_TYPES = {
  DESTINATION_SETUP: 0x01,
  ROUTER_SETUP: 0x02,
  QUERY_SETUP: 0x03,
  REQUEST_SHARED_SECRET: 0x04,
  SHARED_SECRET: 0x05,
  ROUTE: 0x06,
  QUERY_DESTINATION_AVAIL: 0x07,
  DESTINATION_AVAIL_RESULT: 0x08,
  AUTH_REQUEST: 0x09,
  AUTH_RESPONSE: 0x0a,
  INFO_SETUP: 0x10,
  ROUTER_INFO: 0x11,
  ROUTER_INFO_SNAPSHOT: 0x12,
  ROUTER_INFO_RESULT: 0x13,
  EXTENSION_FRAME: 0x7f,
};
