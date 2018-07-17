import {SpanReference, SpanRelationship} from "./SpanReference";
import {Span} from "./Span";
import {SpanContext} from "./SpanContext";
import Tag from './Tag'
import type { TracingFormat } from "./TracingFormat";


export class Tracer {

  startSpan(operationName: string, relatedContexts?: SpanReference[], startTime?: number, ... tags: Tag): void{

  }

  inject(context: SpanContext, format: TracingFormat, carrier: any): void{

  }

  extract(carrier: any, format: TracingFormat): SpanContext{

  }

}
