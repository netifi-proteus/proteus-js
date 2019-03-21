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

import {Subscriber, from} from 'rxjs';
import {Subscription} from 'rsocket-types';
import {
  Flowable,
  Single,
  IPartialFutureSubscriber,
  IPartialSubscriber,
} from 'rsocket-flowable';
import {MAX_REQUEST_N} from 'rsocket-core/build/RSocketFrame';

interface Unsubscribable {
  unsubscribe: () => void;
}

interface Subscribable<T> {
  subscribe: (Subscriber<T>) => Unsubscribable;
}

export default function toObservable(
  rsocketType: Flowable<T> | Single<T>,
  batchSize?: number,
) {
  if (rsocketType.constructor.name === 'Flowable') {
    return from(new ObservableFlowable(rsocketType, batchSize));
  } else if (rsocketType.constructor.name === 'Single') {
    return from(new ObservableSingle(rsocketType));
  } else {
    console.log('Unrecognized type: ' + rsocketType);
    return from(rsocketType);
  }
}

class ObservableFlowable<T> implements Subscribable<T> {
  _subscription: Subscription;
  _source: Flowable<T>;
  _batchSize: number;
  _buffered: number;

  constructor(delegate: Flowable<T>, batchSize?: number = MAX_REQUEST_N) {
    // Symbol logic cloned from observable.ts in rxjs
    const observableSymbol =
      typeof Symbol === 'function' && Symbol.observable
        ? Symbol.observable
        : '@@observable';
    this[observableSymbol] = () => this;
    this._source = delegate;
    this._batchSize = batchSize;
  }

  subscribe(subscriber?: Subscriber<T>): Unsubscribable {
    const unsubscribe = new UnsubscribableSubscription();
    this._source.subscribe(
      new PartialSubscriberAdapter(
        (value: T) => {
          if (!unsubscribe.isCanceled()) {
            if (subscriber && subscriber.next) {
              try {
                subscriber.next(value);
                // Only if someone specified a batch size
                if (this._batchSize < MAX_REQUEST_N) {
                  this._buffered--;
                  if (this._buffered <= 0) {
                    this._buffered = this._batchSize;
                    this._subscription.request(this._batchSize);
                  }
                }
              } catch (error) {
                if (subscriber && subscriber.error) {
                  subscriber.error(error);
                  unsubscribe.unsubscribe();
                }
              }
            }
          }
        },
        error => {
          if (subscriber && subscriber.error) {
            subscriber.error(error);
          }
        },
        () => {
          if (subscriber && subscriber.complete) {
            subscriber.complete();
          }
        },
        (subscription: Subscription) => {
          if (subscription) {
            this._subscription = subscription;
            unsubscribe.setCancelHandle(this._subscription.cancel);
            this._buffered = this._batchSize;
            this._subscription.request(this._batchSize);
          }
        },
      ),
    );

    return unsubscribe;
  }
}

class ObservableSingle<T> implements Subscribable<T> {
  _source: Single<T>;
  _completed: boolean;

  constructor(delegate: Single<T>) {
    // Symbol logic cloned from observable.ts in rxjs
    const observableSymbol =
      typeof Symbol === 'function' && Symbol.observable
        ? Symbol.observable
        : '@@observable';
    this[observableSymbol] = () => this;
    this._source = delegate;
    this._completed = false;
  }

  subscribe(subscriber?: Subscriber<T>): Unsubscribable {
    const unsubscribe = new UnsubscribableSubscription();
    this._source.subscribe(
      new PartialFutureSubscriberAdapter(
        (value: T) => {
          if (!this._completed) {
            try {
              if (subscriber && subscriber.next) {
                subscriber.next(value);
                this._completed = true;
                if (subscriber && subscriber.complete) {
                  subscriber.complete();
                }
              }
            } catch (error) {
              if (subscriber && subscriber.error) {
                subscriber.error(error);
              }
            }
          }
        },
        error => {
          subscriber && subscriber.error && subscriber.error(error);
        },
        (cancel: () => void) => {
          if (cancel) {
            unsubscribe.setCancelHandle(cancel);
          }
        },
      ),
    );

    return unsubscribe;
  }
}

/** * Helper classes ** */

class UnsubscribableSubscription implements Unsubscribable {
  _canceled: boolean;
  _cancel: () => void;

  constructor() {
    this._canceled = false;
  }

  isCanceled(): boolean {
    return this._canceled;
  }

  unsubscribe(): void {
    this._canceled = true;
    if (this._cancel) {
      this._cancel();
    }
  }

  setCancelHandle(cancel: () => void): void {
    this._cancel = cancel;
    if (this._canceled) {
      this._cancel();
    }
  }
}

class PartialFutureSubscriberAdapter<T> implements IPartialFutureSubscriber<T> {
  onError: Error => void;
  onComplete: () => void;
  onSubscribe: Subscription => void;

  constructor(
    onComplete?: T => void,
    onError?: Error => void,
    onSubscribe?: Subscription => void,
  ) {
    this.onComplete = onComplete;
    this.onError = onError;
    this.onSubscribe = onSubscribe;
  }
}

class PartialSubscriberAdapter<T> implements IPartialSubscriber<T> {
  onNext: T => void;
  onError: Error => void;
  onComplete: () => void;
  onSubscribe: Subscription => void;

  constructor(
    onNext?: T => void,
    onError?: Error => void,
    onComplete?: () => void,
    onSubscribe?: Subscription => void,
  ) {
    this.onNext = onNext;
    this.onError = onError;
    this.onComplete = onComplete;
    this.onSubscribe = onSubscribe;
  }
}
