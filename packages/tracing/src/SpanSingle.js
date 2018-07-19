import {Single, IFutureSubscriber} from 'rsocket-flowable';
import {
  Tracer,
  Span,
  SpanContext,
  Reference,
  FORMAT_BINARY,
  BinaryCarrier,
} from 'opentracing';

export class SpanSubscriber<T> extends Single<T>
  implements IFutureSubscriber<T> {
  _span: Span;
  _rootSpan: Span;
  _subscriber: IFutureSubscriber<T>;
  _tracer: Tracer;
  _cancel: () => void;

  constructor(
    single: Single<T>,
    tracer: Tracer,
    name: string,
    context?: SpanContext | Span,
    ...tags: Object
  ) {
    super(subscriber => {
      this._subscriber = subscriber;
      single.subscribe(this);
    });
    this._tracer = tracer;
    //this._single = single;

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

    //Not supported at this time.
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

  onSubscribe(cancel?: () => void) {
    this._cancel = cancel;
    this._span.log('onSubscribe', timeInMicros());
    this._subscriber.onSubscribe(() => {
      this.cancel();
    });
  }

  cancel() {
    try {
      this._span.log('cancel', timeInMicros());
      this._cancel && this._cancel();
    } finally {
      this.cleanup();
    }
  }

  onError(error: Error) {
    try {
      this._span.log('onError', timeInMicros());
      this._subscriber.onError(error);
    } finally {
      this.cleanup();
    }
  }

  onComplete(value: T) {
    try {
      this._span.log('onComplete', timeInMicros());
      this._subscriber.onComplete(value);
    } finally {
      this.cleanup();
    }
  }
}

function timeInMicros() {
  return Date.now() * 1000 /*microseconds*/;
}
