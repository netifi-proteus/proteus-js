// @flow

'use strict';

import http from 'http';
import {Span} from '../zipkin/proto3/zipkin_pb';
import {Ack} from '../proteus/testing/tracing_pb';
import {Flowable, Single} from 'rsocket-flowable';
import {QueuingFlowableProcessor} from 'rsocket-rpc-core';

export class ZipkinTracingService {
  _host: string;
  _path: string;
  _port: number;

  constructor(host: string, port: number, zipkinUrl: string) {
    this._host = host;
    this._path = zipkinUrl;
    this._port = port;
  }

  sendSpan(span: Span, metadata: Buffer): Single<Ack> {
    const result = new Single(sub => {
      sub.onSubscribe();
      const post_body = '[' + convertSpan(span) + ']';

      var post_options = {
        host: this._host,
        port: this._port,
        path: this._path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Set up the request
      console.log('Posting span...');
      var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          console.log('Response chunk: ' + chunk);
        });
        res.on('end', function() {
          console.log('Done!');
          sub.onComplete(new Ack());
        });
      });
      console.log('Logging:' + post_body);
      post_req.write(post_body);
      post_req.end();
    });
    return result;
  }

  streamSpans(spans: Flowable<Span>, metadata: Buffer): Flowable<Ack> {
    let _subscription;
    return new Flowable(sub => {
      let once = false;
      spans.subscribe({
        onNext: span => {
          const post_body = '[' + convertSpan(span) + ']';

          var post_options = {
            host: this._host,
            port: this._port,
            path: this._path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          };

          // Set up the request
          console.log('Posting span...');
          var post_req = http.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
              console.log('Response chunk: ' + chunk);
            });
            res.on('end', function() {
              console.log('Done!');
              if (!once) {
                once = true;
                sub.onSubscribe();
                sub.onNext(new Ack());
                sub.onComplete();
              }
              _subscription.request(1);
            });
          });
          console.log('Logging:' + post_body);
          post_req.write(post_body);
          post_req.end();
        },
        onError: error => {
          console.log('Source errored:' + error);
        },
        onComplete: () => {
          console.log('Source complete');
        },
        onSubscribe: subscription => {
          _subscription = subscription;
          _subscription.request(1);
        },
      });
    });
  }

  streamSpansStreamAcks(
    spans: Flowable<Span>,
    metadata: Buffer,
  ): Flowable<Ack> {
    let pending = 0;
    let done = false;
    const processor = new QueuingFlowableProcessor();
    return new Flowable(sub => {
      let once = false;
      spans.subscribe({
        onNext: span => {
          const post_body = '[' + convertSpan(span) + ']';

          var post_options = {
            host: this._host,
            port: this._port,
            path: this._path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          };

          // Set up the request
          console.log('Posting span...');
          var post_req = http.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
              console.log('Response chunk: ' + chunk);
            });
            res.on('end', function() {
              console.log('Done!');
              pending--;
              if (!once) {
                once = true;
                processor.subscribe(sub);
                //sub.onSubscribe(processor);
              }
              processor.onNext(new Ack());
              //_subscription.request(1);
              if (done && pending <= 0) {
                processor.onComplete();
              }
            });
          });
          console.log('Logging:' + post_body);
          pending++;
          post_req.write(post_body);
          post_req.end();
        },
        onError: error => {
          console.log('Source errored:' + error);
        },
        onComplete: () => {
          console.log('Source complete');
          done = true;
        },
        onSubscribe: subscription => {
          processor.onSubscribe(subscription);
          //processor.request(1);
        },
      });
    });
  }
}

const kind = {
  0: 'SPAN_KIND_UNSPECIFIED',
  1: 'CLIENT',
  2: 'SERVER',
  3: 'PRODUCER',
  4: 'CONSUMER',
};
function convertSpan(span: Span) {
  let obj = span.toObject();
  //Map KIND from number back to string for Go library
  obj.kind = kind[obj.kind];
  //Fix id lengths
  obj.traceId = (obj.traceId || '').padStart(32, '0');
  obj.id = (obj.id || '').padStart(16, '0');
  obj.parentId = (obj.parentId || '').padStart(16, '0');
  //Format requires that parentId is absent for "root" trace
  if (obj.id === obj.parentId) {
    delete obj.parentId;
  }
  //Rename annotations to expected name
  obj.annotations = obj.annotationsList;
  delete obj.annotationsList;
  //Restructure tags to a map and rename per expectation
  obj.tags = obj.tagsMap.reduce((agg, kvp) => {
    agg[kvp[0]] = kvp[1];
    return agg;
  }, {});
  delete obj.tagsMap;

  if (!obj.debug) {
    delete obj.debug;
  }

  if (!obj.shared) {
    delete obj.shared;
  }

  return JSON.stringify(obj);
}
