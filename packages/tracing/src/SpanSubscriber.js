import {ISubscriber, ISubscription} from 'rsocket-types';
import {
  Tracer,
  Span,
  SpanContext,
  Reference,
  FORMAT_BINARY,
  BinaryCarrier,
} from 'opentracing';

export class SpanSubscriber<T> implements ISubscriber<T>, ISubscription {
  _span: Span;
  _rootSpan: Span;
  _subscriber: ISubscriber;
  _tracer: Tracer;
  _subscription: ISubscription;

  constructor(
    subscriber: ISubscriber<T>,
    tracer: Tracer,
    name: string,
    context?: SpanContext | Span,
    ...tags: Object
  ) {
    this._tracer = tracer;
    this._subscriber = subscriber;

    let options = {};

    if (context) {
      options.childOf = context;
    } else if (this._rootSpan) {
      options.childOf = context;
    }

    if (tags) {
      const finalTags = {};
      for (var tag in tags) {
        Object.keys(tag).forEach(key => {
          finalTags[key] = tag[key];
        });
      }
      options.tags = finalTags;
    }

    //Not currently supported
    // if (references) {
    //   options.references = references;
    // }
    //
    // if (startTime) {
    //   options.startTime = startTime;
    // }

    this._span = tracer.startSpan(name, options);
    this._rootSpan = this._rootSpan || this._span;

    const adapter = new BinaryCarrier();
    tracer.inject(this._span.context(), FORMAT_BINARY, adapter);
  }

  cleanup() {
    this._span.finish();
  }

  onSubscribe(subscription?: Subscription) {
    this._subscription = subscription;
    this._span.log('onSubscribe', timeInMicros());
    this._subscriber.onSubscribe(this);
  }

  request(n: number) {
    this._span.log('request', timeInMicros());
    this._subscription && this._subscription.request(n);
  }

  cancel() {
    try {
      this._span.log('cancel', timeInMicros());
      this._subscription && this._subscription.cancel();
    } finally {
      this.cleanup();
    }
  }

  onNext(value: T) {
    this._span.log('onNext', timeInMicros());
    this._subscriber.onNext(value);
  }

  onError(error: Error) {
    try {
      this._span.log('onError', timeInMicros());
      this._subscriber.onError(error);
    } finally {
      this.cleanup();
    }
  }

  onComplete() {
    try {
      this._span.log('onComplete', timeInMicros());
      this._subscriber.onComplete();
    } finally {
      this.cleanup();
    }
  }
}

function timeInMicros() {
  return Date.now() * 1000 /*microseconds*/;
}
