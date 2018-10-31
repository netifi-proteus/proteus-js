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

import {MetricsSnapshot, Skew} from 'rsocket-rpc-metrics';
import {Flowable} from 'rsocket-flowable';

export default class SimpleMetricsService {
  constructor() {}

  streamMetrics(
    snapshots: Flowable<MetricsSnapshot>,
    metadata: Buffer,
  ): Flowable<Skew> {
    let pending = 0;
    let done = false;
    return new Flowable(sub => {
      sub.onSubscribe({
        request: n => {
          pending += n;
        },
        cancel: () => {
          done = true;
        },
      });
      snapshots.subscribe({
        onNext: snapshot => {
          console.log('Metrics snapshot received:');
          console.log(JSON.stringify(snapshot.toObject()));

          const skew = new Skew();
          skew.setTimestamp(new Date().getTime());
          if (!done) {
            sub.onNext(skew);
          }
        },
        onError: error => {
          console.log('Metrics errored:' + error.toString());
          if (!done) {
            sub.onComplete();
          }
        },
        onComplete: () => {
          console.log('Metrics complete');
          if (!done) {
            sub.onComplete();
          }
        },
        onSubscribe: subscription => {
          subscription.request(2147483647);
        },
      });
    });
  }
}
