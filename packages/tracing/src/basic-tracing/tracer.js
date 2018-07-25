'use strict';

import {Tracer, FORMAT_TEXT_MAP} from 'opentracing';
import BasicSpan from './span';
import {TextMapPropagator} from './propagation';
import {DefaultSampler} from './sampler';
import {ZipkinRecorder} from './recorder';
import {Proteus} from 'proteus-js-client';

// Implement https://github.com/opentracing/opentracing-javascript/blob/master/src/tracer.js
export class BasicTracer extends Tracer {
  /**
   * Constructs basic tracer instance with provided Sampler and Recorder
   * @param  {Object} options
   *         Optional associative array of fields.
   *         - `sampler` {Sampler} Optional object with `isSample` method, the
   *             method provided with current span as arguments, return
   *             Boolean value indicate whether should take current span
   *             as sample. See src/sample.js for example.
   *         - `recorder` {Recorder} Optional object with `record` method, the
   *             method take span and do whatever required to record a span.
   *             See src/recorder.js for example.
   *
   * @return {BasicTracer}
   */
  constructor(
    {sampler, recorder} = {},
    proteusGateway?: Proteus,
    url?: string,
    localService?: string,
    remoteService?: string,
    shared: boolean,
  ) {
    super();
    this._sampler = sampler || new DefaultSampler();
    if (!proteusGateway) {
      proteusGateway = Proteus.create({
        setup: {
          group: 'default-tracer-demo',
          accessKey: 9007199254740991,
          accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
        },
        transport: {
          url,
        },
      });
    }

    this._recorder =
      recorder ||
      new ZipkinRecorder(proteusGateway, localService, remoteService, shared);
    this._textPropagator = new TextMapPropagator(this);
  }

  setInterface(inf) {
    this._interface = inf;
  }

  startSpan(name, fields) {
    // Interface or Implementation argument
    // https://github.com/opentracing/opentracing-javascript/pull/29
    if (fields.parent) {
      fields.childOf = fields.childOf.imp();
    }
    return new BasicSpan(this, {
      operationName: name,
      parent: fields.childOf,
      startTime: fields.startTime,
      tags: fields.tags,
    });
  }

  inject(span, format, carrier) {
    if (format === FORMAT_TEXT_MAP) {
      this._textPropagator.inject(span, carrier);
    }
  }

  extract(format, carrier) {
    let span;
    if (format === FORMAT_TEXT_MAP) {
      span = this._textPropagator.extract(carrier);
    }
    return span;
  }

  join(operationName, format, carrier) {
    let span;
    if (format === FORMAT_TEXT_MAP) {
      span = this._textPropagator.join(operationName, carrier);
    }
    return span;
  }

  _isSampled(span, parent) {
    return this._sampler.isSampled(span, parent);
  }
  _record(span) {
    this._recorder.record(span);
  }
}
