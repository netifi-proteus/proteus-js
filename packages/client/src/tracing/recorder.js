import {Span, Endpoint, Annotation} from '../zipkin/proto3/zipkin_pb';
import Long from 'long';
import {ProteusTracingServiceClient} from '../proteus/testing/tracing_rsocket_pb';
import {QueuingFlowableProcessor} from 'rsocket-rpc-core';
import {ISubscription} from 'rsocket-types';

export class DefaultRecorder {
  /**
   * @param  {BasicSpan}
   *         Span to record, BasicSpan has following fields
   *         - `operationName` {String}
   *         - `startTime` {Number}
   *         - `duration` {Number}
   *         - `tags` {Object} Optional
   *         - `logs` {Array} Optional
   *         - `traceId` {Long} Fixed64 unique id represent by
   *             [long.js](https://github.com/dcodeIO/long.js) instance.
   *         - `spanId` {Long} Fixed64 unique id.
   *         - `parentId` {String}
   *         - `sampled` {Boolean}
   *         - `baggage` {Object} Default to empty object if no baggage in span.
   */
  record(span) {
    // eslint-disable-line
  }
}

export class ZipkinRecorder extends DefaultRecorder {
  _localService: string;
  _remoteService: string;
  _group: string;
  _destination: string;
  _service: string;
  _shared: boolean;
  _once: boolean;
  _sub: ISubscription;
  _client: ProteusTracingServiceClient;
  _inputSpans: QueuingFlowableProcessor<Span>;

  constructor(
    proteusGateway,
    localService?: string,
    remoteService?: string,
    shared?: boolean,
  ) {
    super();

    this._group = proteusGateway.myGroup();
    this._destination = proteusGateway.myDestination();
    this._localService = localService;
    this._remoteService = remoteService;
    this._shared = shared;
    this._once = false;
    if (proteusGateway) {
      this._client = new ProteusTracingServiceClient(
        proteusGateway.group('com.netifi.proteus.tracing'),
      );
      this._inputSpans = new QueuingFlowableProcessor();
    }
  }

  record(span) {
    if (this._client) {
      try {
        const loggableSpan = mapSpan(
          span,
          this._localService,
          this._remoteService,
          this._group,
          this._destination,
          this._service,
          this._shared,
        );
        if (!this._once) {
          this._once = true;
          this._client
            .streamSpans(this._inputSpans, Buffer.alloc(0))
            .subscribe({
              onNext: ack => {
                this._sub && this._sub.request(1);
              },
              onComplete: () => {
                console.log('recording span complete from tracing service');
              },
              onError: err => {
                console.log(
                  'Failed to log span:' + span.spanId.toString() + ' ' + err,
                );
              },
              onSubscribe: sub => {
                //No intention of canceling
                this._sub = sub;
                this._sub.request(1);
              },
            });
        }
        this._inputSpans.onNext(loggableSpan);
      } catch (error) {
        console.log('Error occurred while attempting to send trace: ' + error);
      }
    }
  }
}

function mapSpan(
  span: Object,
  localService?: string,
  remoteService?: string,
  group?: string,
  destination?: string,
  service?: string,
  shared?: boolean,
): Span {
  const result = new Span();
  result.setName(span.operationName.toString());
  result.setTraceId(span.traceId.toString());
  result.setId(span.spanId.toString());
  result.setDuration(Long.fromNumber(span.duration));
  result.setTimestamp(Long.fromNumber(span.startTime));
  if (span.spanId.toString() !== span.parentId.toString()) {
    result.setParentId(span.parentId.toString());
  }
  //kind
  if (span.tags['proteus.type']) {
    let kindString = span.tags['proteus.type'].toString().toUpperCase();
    let kind = Span.Kind[kindString] || Span.Kind.SPAN_KIND_UNSPECIFIED;
    result.setKind(kind);
  }
  if (span.tags) {
    let map = result.getTagsMap();
    Object.keys(span.tags).forEach(key => {
      map.set(key, span.tags[key]);
    });
    if (group) {
      map.set('group', group);
    }
    if (destination) {
      map.set('destination', destination);
    }
  }
  if (span.logs) {
    let annotations = [];
    span.logs.forEach(log => {
      const annotation = new Annotation();
      annotation.setTimestamp(log.timestamp);
      annotation.setValue(log.event);
      annotations.push(annotation);
    });
    result.setAnnotationsList(annotations);
  }
  if (localService) {
    result.setLocalEndpoint(constructEndpoint(localService));
  }
  if (remoteService) {
    result.setRemoteEndpoint(constructEndpoint(remoteService));
  }
  result.setShared(!!shared);

  return result;
}

function constructEndpoint(service: string): Endpoint {
  const endpoint = new Endpoint();
  endpoint.setServiceName(service);
  //TODO: Figure this out for real
  endpoint.setIpv4('127.0.0.1');
  return endpoint;
}
