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

import type {Encodable} from 'rsocket-core';

export type Frame =
  | DestinationSetupFrame
  | RouterSetupFrame
  | QuerySetupFrame
  | RequestSharedSecretFrame
  | SharedSecredFrame
  | RouteFrame
  | QueryDestinationAvailFrame
  | DestinationAvailResultFrame
  | AuthenticationRequestFrame
  | AuthenticationResponseFrame
  | InfoSetupFrame
  | RouterInfoFrame
  | RouterInfoSnapshotFrame
  | RouterInfoResultFrame
  | ExtensionFrame;

export const RouterNodeInfoEventType = {
  JOIN: 0x01,
  LEAVE: 0x02,
  SEED_NEXT: 0x03,
  SEED_COMPLETE: 0x04,
};

// prettier-ignore
export type RouterNodeInfoEventTypeEnum = $Values<typeof RouterNodeInfoEventType>;

// prettier-ignore
export type DestinationSetupFrame = {|
  type: 0x01,
  flags: number,
  publicKey: ?Encodable,
  accessToken: Encodable,
  seqId: number,
  accessKey: number,
  destination: string,
  group: string
|};

// prettier-ignore
export type RouterSetupFrame = {|
  type: 0x02,
  flags: number,
  clusterId: number,
  routerId: number,
  authToken: ?Encodable,
  seqId: number
|};

// prettier-ignore
export type QuerySetupFrame = {|
  type: 0x03,
  flags: number,
  accessToken: ?Encodable,
  accessKey: number,
  seqId: number
|};

// prettier-ignore
export type RequestSharedSecretFrame = {|
  type: 0x04,
  flags: number,
  token: number,
  publicKey: ?Encodable,
  seqId: number
|};

// prettier-ignore
export type SharedSecredFrame = {|
  type: 0x05,
  flags: number,
  token: number,
  publicKey: ?Encodable,
  sharedSecret: ?Encodable,
  seqId: number
|};

// prettier-ignore
export type RouteFrame = {|
  type: 0x06,
  flags: number,
  hasToken: boolean,
  hasMetadata: boolean,
  token: number,
  fromAccessKey: number,
  fromDestination: string,
  seqId: number,
  route: ?Encodable,
  wrappedMetadata: ?Encodable,
|};

// prettier-ignore
export type QueryDestinationAvailFrame = {|
  type: 0x07,
  flags: number,
  hasToken: boolean,
  token: number,
  accessKey: number,
  accountId: number,
  destinationId: number,
  seqId: number
|};

// prettier-ignore
export type DestinationAvailResultFrame = {|
  type: 0x08,
  flags: number,
  destination: string,
  found: boolean,
  seqId: number
|};

// prettier-ignore
export type AuthenticationRequestFrame = {|
  type: 0x09,
  flags: number,
  accessToken: ?Encodable,
  accessKey: number,
  seqId: number
|};

// prettier-ignore
export type AuthenticationResponseFrame = {|
  type: 0x0A,
  flags: number,
  accountId: number,
  count: number,
  sessionToken: ?Encodable,
  seqId: number
|};

// prettier-ignore
export type InfoSetupFrame = {|
  type: 0x10,
  flags: number,
  publicKey: ?Encodable,
  accessToken: ?Encodable,
  seqId: number,
  accessKey: number,
  destination: string,
  group: string
|};

// prettier-ignore
export type RouterInfoFrame = {|
  type: 0x11,
  flags: number,
  seqId: number
|};

// prettier-ignore
export type RouterInfoSnapshotFrame = {|
  type: 0x12,
  flags: number,
  seqId: number
|};

// prettier-ignore
export type RouterInfoResultFrame = {|
  type: 0x13,
  flags: number,
  eventType: RouterNodeInfoEventTypeEnum,
  routerId: string,
  routerAddress: string,
  routerPort: number,
  clusterAddress: string,
  clusterPort: number,
  adminAddress: string,
  adminPort: number,
  seqId: number
|};

// prettier-ignore
export type ExtensionFrame = {|
  type: 0x7F,
  flags: number,
  seqId: number
|};
