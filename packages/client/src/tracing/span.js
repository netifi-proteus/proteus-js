'use strict';
import clone from 'lodash.clone';
import Long from 'long';

// Implement https://github.com/opentracing/opentracing-javascript/blob/master/src%2Fspan.js
export default class BasicSpan {
  constructor(
    tracer,
    {operationName, spanId, parent, tags, startTime = Date.now()},
  ) {
    this._tracer = tracer;

    this.operationName = operationName;

    if (parent) {
      this.parent = parent;
      this.traceId = parent.traceId;
      this.spanId = spanId || BasicSpan.generateLongString();
      this.parentId = parent.spanId;
      this.sampled = parent.sampled;
      this.baggage = clone(parent.baggage);
    } else {
      this.parent = this;
      this.traceId = BasicSpan.generateTraceString();
      this.spanId = spanId || BasicSpan.generateLongString();
      this.parentId = this.spanId;
      this.sampled = this._tracer._isSampled(this);
      this.baggage = {};
    }

    this.tags = clone(tags);

    this.startTime = startTime;
  }

  context() {
    return this.parent;
  }

  tracer() {
    return this._tracer;
  }

  setOperationName(name) {
    this.operationName = name;
  }

  setTag(key, value) {
    if (!this.tags) {
      this.tags = {};
    }
    this.tags[key] = value;
  }

  addTags(keyValuePairs) {
    for (const key in keyValuePairs) {
      this.setTag(key, keyValuePairs[key]);
    }
  }

  setBaggageItem(key, value) {
    this.baggage[key] = value;
  }

  getBaggageItem(key) {
    return this.baggage[key];
  }

  log(event, timestamp = Date.now() * 1000) {
    if (!this.logs) {
      this.logs = [];
    }
    this.logs.push({
      event,
      timestamp,
    });
  }

  finish(finishTime = Date.now() * 1000) {
    this.duration = finishTime - this.startTime;
    this._tracer._record(this);
  }

  static generateLongString() {
    // let buffer = uuid.v4(null, new Buffer(8));
    const high = Math.floor(Math.random() * (Math.pow(2, 32) - 1));
    const low = Math.floor(Math.random() * (Math.pow(2, 32) - 1));
    return new Long(low, high, true).toString(16).padStart(16, '0');
  }

  static generateTraceString() {
    // let buffer = uuid.v4(null, new Buffer(8));
    return BasicSpan.generateLongString() + BasicSpan.generateLongString();
  }
}
