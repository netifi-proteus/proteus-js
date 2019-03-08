'use strict';

import BasicSpan from './span';

const PREFIX_TRACER_STATE = 'ot-tracer-';
const PREFIX_BAGGAGE = 'ot-baggage-';
const FIELD_NAME_TRACE_ID = PREFIX_TRACER_STATE + 'traceid';
const FIELD_NAME_SPAN_ID = PREFIX_TRACER_STATE + 'spanid';
const FIELD_NAME_SAMPLED = PREFIX_TRACER_STATE + 'sampled';
const FIELD_COUNT = 3;

export class TextMapPropagator {
  constructor(tracer) {
    this._tracer = tracer;
  }

  inject(span, carrier) {
    carrier[FIELD_NAME_TRACE_ID] = span.traceId.toString();
    carrier[FIELD_NAME_SPAN_ID] = span.spanId.toString();
    carrier[FIELD_NAME_SAMPLED] = String(span.sampled);
    for (const key in span.baggage) {
      carrier[PREFIX_BAGGAGE + key] = span.baggage[key];
    }
  }

  extract(carrier) {
    return this.join(null, carrier);
  }

  join(operationName, carrier) {
    const parent = {
      baggage: {},
    };
    let count = 0;
    for (const field in carrier) {
      if (field === FIELD_NAME_TRACE_ID) {
        // parent.traceId = Long.fromString(carrier[field], true);
        parent.traceId = carrier[field];
        count += 1;
      } else if (field === FIELD_NAME_SPAN_ID) {
        // parent.spanId = Long.fromString(carrier[field], true);
        parent.spanId = carrier[field];
        count += 1;
      } else if (field === FIELD_NAME_SAMPLED) {
        if (carrier[field] !== 'true' && carrier[field] !== 'false') {
          throw new Error(
            'Trace corrupted, sampled should be type ' +
              `Boolean, got ${carrier[field]}`,
          );
        }
        parent.sampled = Boolean(carrier[field]);
        count += 1;
      } else if (field.indexOf(PREFIX_BAGGAGE) === 0) {
        parent.baggage[field.slice(PREFIX_BAGGAGE.length)] = carrier[field];
      }
    }
    if (count !== FIELD_COUNT) {
      throw new Error('Trace corrupted, require traceId, spanId and sampled');
    }
    return new BasicSpan(this._tracer, {
      operationName,
      spanId: parent.spanId,
      parent,
    });
  }
}
