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
 */

import {expect} from 'chai';
import {describe, it} from 'mocha';

import {MAX_REQUEST_N} from 'rsocket-core/build/RSocketFrame';

import Proteus from '../Proteus';

import Deferred from 'fbjs/lib/Deferred';

import BrokerInfoServiceClient from '../BrokerInfoServiceClient';

import {Empty} from 'proteus-js-core';

import WebSocket from 'ws';
global.WebSocket = WebSocket;

describe('BrokerInfoServiceClient', () => {
  it('retrieves brokers', async () => {
    const proteus = Proteus.create({
      setup: {
        group: 'group',
        keepAlive: 1000000, // avoid sending during test
        lifetime: 100000,
        accessKey: 9007199254740991,
        accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
      },
      transport: {
        url: 'ws://localhost:8101/',
      },
    });

    const brokerInfoService = new BrokerInfoServiceClient(
      proteus.group('com.netifi.proteus.brokerServices'),
    );

    const deferred = new Deferred();
    brokerInfoService.brokers(new Empty(), Buffer.alloc(0)).subscribe({
      onComplete() {
        console.log('onComplete()');
      },
      onError(error) {
        console.log('onError(%s)', error.message);
        deferred.reject(error);
      },
      onNext(broker) {
        console.log('onNext(%o)', broker.toObject());
        deferred.resolve(broker.toObject());
      },
      onSubscribe(subscription) {
        subscription.request(MAX_REQUEST_N);
      },
    });
    const broker = await deferred;
    proteus.close();
    expect(broker).to.not.equal(null);
    expect(broker.brokerid).to.not.equal(undefined);
  });
});
