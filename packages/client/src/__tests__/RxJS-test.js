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

import {from, of, pipe} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import toObservable from '../rx/FlowableAdapter';
import {Flowable, Single} from 'rsocket-flowable';
import {expect} from 'chai';
import {describe, it} from 'mocha';

describe('Single to Observable', () => {
  it('creates an observable that emits once and completes', done => {
    const baseSingle = new Single(subscriber => {
      const handle = setTimeout(() => {
        subscriber.onComplete('Hello');
      }, 500);
      subscriber.onSubscribe(() => clearTimeout(handle));
    });

    let onNextCalled = false;
    const start = Date.now();

    toObservable(baseSingle).subscribe(
      t => {
        expect(t).to.equal('Hello');
        onNextCalled = true;
      },
      error => {
        expect(error).to.equal(undefined);
        done();
      },
      unexpected => {
        expect(unexpected).to.equal(undefined);
        expect(onNextCalled).to.equal(true);
        expect(Date.now() - start).to.be.at.least(500);
        done();
      },
    );
  });

  it('creates an observable that can be canceled', done => {
    const baseSingle = new Single(subscriber => {
      const handle = setTimeout(() => {
        subscriber.onComplete('Hello');
      }, 500);
      subscriber.onSubscribe(() => clearTimeout(handle));
    });

    const subscription = toObservable(baseSingle).subscribe(
      t => {
        console.log('OnNext not expected, called with ' + t);
        expect(false).to.equal(true);
        done();
      },
      error => {
        console.log('OnError not expected, called with ' + error);
        expect(false).to.equal(true);
        done();
      },
      unexpected => {
        console.log('OnComplete not expected, called with ' + unexpected);
        expect(false).to.equal(true);
        done();
      },
    );

    subscription.unsubscribe();

    setTimeout(() => {
      done();
    }, 750);
  });

  it('creates an observable that can error', done => {
    const baseSingle = new Single(subscriber => {
      const handle = setTimeout(() => {
        subscriber.onError('I got a boo boo');
      }, 500);
      subscriber.onSubscribe(() => clearTimeout(handle));
    });

    toObservable(baseSingle).subscribe(
      t => {
        console.log('OnNext not expected, called with ' + t);
        expect(false).to.equal(true);
        done();
      },
      error => {
        expect(error).to.equal('I got a boo boo');
        done();
      },
      unexpected => {
        console.log('OnComplete not expected, called with ' + unexpected);
        expect(false).to.equal(true);
        done();
      },
    );
  });

  it('creates an observable that can be mapped', done => {
    const baseSingle = new Single(subscriber => {
      const handle = setTimeout(() => {
        subscriber.onComplete('Hello');
      }, 500);
      subscriber.onSubscribe(() => clearTimeout(handle));
    });

    let onNextCalled = false;
    const start = Date.now();

    toObservable(baseSingle)
      .pipe(
        map(s => {
          return s
            .split('')
            .reverse()
            .join('');
        }),
      )
      .subscribe(
        t => {
          expect(t).to.equal('olleH');
          onNextCalled = true;
        },
        error => {
          expect(error).to.equal(undefined);
          done();
        },
        unexpected => {
          expect(unexpected).to.equal(undefined);
          expect(onNextCalled).to.equal(true);
          expect(Date.now() - start).to.be.at.least(500);
          done();
        },
      );
  });
});

describe('Flowable to Observable', () => {
  it('creates an observable that emits several times and completes', done => {
    const baseFlowable = new Flowable(subscriber => {
      let count = 0;
      let canceled = false;
      subscriber.onSubscribe({
        cancel: () => (canceled = true),
        request: n => {
          while (!canceled && n > 0 && count < 5) {
            subscriber.onNext(count++);
            n--;
          }

          if (count >= 5 && !canceled) {
            canceled = true;
            subscriber.onComplete();
          }
        },
      });
    });

    let onNextCalled = 0;
    let received = 0;
    toObservable(baseFlowable).subscribe(
      t => {
        expect(t).to.equal(received++);
        onNextCalled++;
      },
      error => {
        expect(error).to.equal(undefined);
        done();
      },
      unexpected => {
        expect(unexpected).to.equal(undefined);
        expect(onNextCalled).to.equal(5);
        done();
      },
    );
  });

  it('creates an observable that respects batch size and emits several times and completes', done => {
    let requestCalled = 0;
    const baseFlowable = new Flowable(subscriber => {
      let count = 0;
      let canceled = false;
      subscriber.onSubscribe({
        cancel: () => (canceled = true),
        request: n => {
          requestCalled++;
          while (!canceled && n > 0 && count < 5) {
            subscriber.onNext(count++);
            n--;
          }

          if (count >= 5 && !canceled) {
            canceled = true;
            subscriber.onComplete();
          }
        },
      });
    });

    let onNextCalled = 0;
    let received = 0;
    toObservable(baseFlowable, 2).subscribe(
      t => {
        expect(t).to.equal(received++);
        onNextCalled++;
      },
      error => {
        expect(error).to.equal(undefined);
        done();
      },
      unexpected => {
        expect(unexpected).to.equal(undefined);
        expect(onNextCalled).to.equal(5);
        expect(requestCalled).to.equal(3);
        done();
      },
    );
  });

  it('creates an observable that can be canceled', done => {
    const baseFlowable = new Flowable(subscriber => {
      let count = 0;
      let canceled = false;
      setTimeout(() => {
        subscriber.onSubscribe({
          cancel: () => (canceled = true),
          request: n => {
            while (!canceled && n > 0 && count < 5) {
              subscriber.onNext(count++);
              n--;
            }

            if (count >= 5 && !canceled) {
              canceled = true;
              subscriber.onComplete();
            }
          },
        });
      }, 100);
    });

    let onNextCalled = 0;
    let received = 0;
    let subscription;
    subscription = toObservable(baseFlowable).subscribe(
      t => {
        expect(t).to.equal(received++);
        onNextCalled++;
        if (onNextCalled > 2) {
          subscription.unsubscribe();
          expect(onNextCalled).to.equal(3);
          setTimeout(done, 100);
        }
      },
      error => {
        console.log('OnError not expected, called with ' + error);
        expect(false).to.equal(true);
        done();
      },
      unexpected => {
        console.log('OnComplete not expected, called with ' + unexpected);
        expect(false).to.equal(true);
        done();
      },
    );
  });

  it('creates an observable that can error', done => {
    const baseFlowable = new Flowable(subscriber => {
      let count = 0;
      let canceled = false;
      subscriber.onSubscribe({
        cancel: () => (canceled = true),
        request: n => {
          while (!canceled && n > 0 && count < 5) {
            if (count > 2) {
              subscriber.onError('I got a boo boo');
              canceled = true;
            } else {
              subscriber.onNext(count++);
            }
            n--;
          }

          if (count >= 5 && !canceled) {
            canceled = true;
            subscriber.onComplete();
          }
        },
      });
    });

    let onNextCalled = 0;
    let received = 0;
    toObservable(baseFlowable).subscribe(
      t => {
        expect(t).to.equal(received++);
        onNextCalled++;
      },
      error => {
        expect(error).to.equal('I got a boo boo');
        expect(onNextCalled).to.equal(3);
        done();
      },
      unexpected => {
        console.log('OnComplete not expected, called with ' + unexpected);
        expect(false).to.equal(true);
        done();
      },
    );
  });

  it('creates an observable that can be mergeMapped', done => {
    const baseFlowable = new Flowable(subscriber => {
      let count = 1;
      let last = [];
      let canceled = false;
      subscriber.onSubscribe({
        cancel: () => (canceled = true),
        request: n => {
          while (!canceled && n > 0 && count < 6) {
            last.push(count++);
            subscriber.onNext(last);
            n--;
          }

          if (count >= 6 && !canceled) {
            canceled = true;
            subscriber.onComplete();
          }
        },
      });
    });

    let onNextCalled = false;
    let received = 1;
    let max = 1;
    toObservable(baseFlowable)
      .pipe(
        mergeMap(numbers => {
          return of(...numbers);
        }),
      )
      .subscribe(
        t => {
          expect(t).to.equal(received++);
          if (received > max) {
            max++;
            received = 1;
          }
          onNextCalled++;
        },
        error => {
          expect(error).to.equal(undefined);
          done();
        },
        unexpected => {
          expect(unexpected).to.equal(undefined);
          expect(onNextCalled).to.equal(15);
          done();
        },
      );
  });
});
