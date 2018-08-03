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

import Proteus from './Proteus';

import {
  AccessKey,
  AccessKeyParameters,
  AccessToken,
  AccessTokenInfo,
} from './proteus/accesskey_info_pb';

import {Broker, Group, Destination, Event} from './proteus/broker_info_pb';

import {
  AccessKeyInfoServiceClient,
  AccessKeyInfoServiceServer,
} from './proteus/accesskey_info_proteus_pb';
import {
  BrokerInfoServiceClient,
  BrokerInfoServiceServer,
} from './proteus/broker_info_proteus_pb';
import {
  BrokerManagementServiceClient,
  BrokerManagementServiceServer,
} from './proteus/broker_mgmt_proteus_pb';

import toObservable from './rx/FlowableAdapter';

/**
 * The public API of the `client` package.
 */
export type {ProteusConfig} from './Proteus';

export {
  Proteus,
  toObservable,
  BrokerInfoServiceClient,
  BrokerInfoServiceServer,
  AccessKeyInfoServiceClient,
  AccessKeyInfoServiceServer,
  BrokerManagementServiceClient,
  BrokerManagementServiceServer,
  AccessKey,
  AccessKeyParameters,
  AccessToken,
  AccessTokenInfo,
  Broker,
  Group,
  Destination,
  Event,
};
