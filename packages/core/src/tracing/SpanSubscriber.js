import {ISubscriber, ISubscription} from 'rsocket-types';
import {Span} from "./Span";
import {SpanContext} from "./SpanContext";
import {Tracer} from "./Tracer";
import Tag from './Tag';

export class SpanSubscriber<T> implements ISubscriber<T> {

  // private final Span span;
  // +  private final Span rootSpan;
  // +  private final Subscriber<? super T> subscriber;
  // +  private final Context context;
  // +  private final Tracer tracer;
  // +  private Subscription s;

  _span: Span;
  _rootSpan: Span;
  _subscriber: ISubscriber;
  _tracer: Tracer;
  _subscription: ISubscription;

  constructor(subscriber: ISubscriber<T>, context?: SpanContext, tracer: Tracer, map?: Object, name: string, tags?: Tag[]){

  }


}
