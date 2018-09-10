const {Annotation, Endpoint, Span} = require('../zipkin/proto3/zipkin_pb');
const {
  ProteusTracingServiceClient,
} = require('../../dist/proteus/testing/tracing_rsocket_pb');

const {
  MetricsExporter,
  SimpleMeterRegistry,
  MetricsSnapshotHandlerClient,
  MetricsSnapshotHandlerServer,
} = require('rsocket-rpc-metrics');
const SimpleMetricsService = require('../../dist/metrics/SimpleMetricsService')
  .default;

const Long = require('long');
const {ZipkinTracingService} = require('../../dist/tracing/tracingService');
const {BasicTracer} = require('../../dist/tracing/tracer');
const {
  ProteusTracingServiceServer,
} = require('../../dist/proteus/testing/tracing_rsocket_pb');
const Proteus = require('../../../client/dist/Proteus').default;
const {BufferEncoders} = require('rsocket-core');
const {Flowable, Single} = require('rsocket-flowable');
const RSocketTcpClient = require('rsocket-tcp-client').default;
const WebSocket = require('ws');
global.WebSocket = WebSocket;

const url = 'wss://localhost:8101/';
const tcpConnection = new RSocketTcpClient(
  {host: 'localhost', port: 8001},
  BufferEncoders,
);

const metricsInterval = 15;
const meterRegistry = new SimpleMeterRegistry();

let tracingServiceGateway = Proteus.create({
  setup: {
    group: 'com.netifi.proteus.tracing',
    destination: 'tracing-gateway-js',
    accessKey: 9007199254740991,
    accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
  },
  transport: {
    //connection: tcpConnection
    url,
    wsCreator: url =>
      new WebSocket(url, {
        rejectUnauthorized: false,
      }),
  },
});

tracingServiceGateway.addService(
  'io.netifi.proteus.tracing.ProteusTracingService',
  new ProteusTracingServiceServer(
    new ZipkinTracingService('localhost', 9411, '/api/v2/spans'),
    undefined,
    meterRegistry,
  ),
);
console.log('Connecting to localhost for tracing service...');
tracingServiceGateway._connect().subscribe({
  onComplete: val => {
    console.log('Tracing connected');
  },
  onError: err => {
    console.log('Failed to connect:' + err);
  },
  onSubscribe: () => {},
});

let metricsServiceGateway = Proteus.create({
  setup: {
    group: 'com.netifi.proteus.metrics',
    destination: 'metrics-gateway-js',
    accessKey: 9007199254740991,
    accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
  },
  transport: {
    //connection: tcpConnection
    url,
    wsCreator: url =>
      new WebSocket(url, {
        rejectUnauthorized: false,
      }),
  },
});

metricsServiceGateway.addService(
  'io.rsocket.rpc.metrics.om.MetricsSnapshotHandler',
  new MetricsSnapshotHandlerServer(new SimpleMetricsService()),
);
console.log('Connecting to localhost for metrics service...');

metricsServiceGateway._connect().subscribe({
  onComplete: val => {
    console.log('Metrics connected');
  },
  onError: err => {
    console.log('Failed to connect:' + err);
  },
  onSubscribe: () => {},
});

const clientOneId = 'thingOne';
let clientGateway = Proteus.create({
  setup: {
    group: 'pinger',
    destination: clientOneId,
    accessKey: 9007199254740991,
    accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
  },
  transport: {
    //connection: tcpConnection,
    url,
    wsCreator: url =>
      new WebSocket(url, {
        rejectUnauthorized: false,
      }),
  },
});

const metricsClient = new MetricsSnapshotHandlerClient(
  clientGateway.group('com.netifi.proteus.metrics'),
);

const metricsExporter = new MetricsExporter(
  metricsClient,
  meterRegistry,
  metricsInterval,
  1024,
);

const basicTracer = new BasicTracer(
  {
    /*default sampler/recorder*/
    recorder: {record: () => {}},
  },
  clientGateway,
  null /*no url needed*/,
  'channel-test',
  null,
  true,
);

const client = new ProteusTracingServiceClient(
  clientGateway.group('com.netifi.proteus.tracing'),
  undefined,
  meterRegistry,
);

let lastSpan = null;
let canceled = false;
let max = 10;
let count = 0;
let opname = 'stream span op';
let singleSpan = new Single(subscriber => {
  subscriber.onSubscribe(() => {
    canceled = true;
    console.log('Subscriber canceled span');
  });

  lastSpan = basicTracer.startSpan(opname, {
    childOf: lastSpan,
    startTime: Date.now() * 1000,
    tags: {},
  });

  subscriber.onComplete(
    mapSpan(
      lastSpan,
      'testSource',
      'remoteTracer',
      clientGateway.myGroup(),
      clientGateway.myDestination(),
    ),
  );
});
let spanStream = new Flowable(subscriber => {
  subscriber.onSubscribe({
    cancel: () => {
      canceled = true;
      console.log('Subscriber canceled span stream');
    },
    request: n => {
      while (!canceled && n-- > 0 && count++ < max) {
        lastSpan = basicTracer.startSpan(opname, {
          childOf: lastSpan,
          startTime: Date.now() * 1000,
          tags: {},
        });
        subscriber.onNext(
          mapSpan(
            lastSpan,
            'testSource',
            'remoteTracer',
            clientGateway.myGroup(),
            clientGateway.myDestination(),
          ),
        );
      }
      if (count >= max) {
        subscriber.onComplete();
      }
    },
  });
});

setTimeout(() => {
  console.log('Here we go');
  metricsExporter.start();
  setTimeout(() => {
    console.log('stopping metrics');
    metricsExporter.stop();
  }, (metricsInterval + 1) * 1000);
  let _sub;
  singleSpan.subscribe({
    onComplete: span => {
      client.sendSpan(span, Buffer.alloc(0)).subscribe({
        onSubscribe: () => {},
        onComplete: response => {
          console.log('received response');
          client.streamSpans(spanStream, Buffer.alloc(0)).subscribe({
            onNext: ack => {
              console.log('received ack');
              _sub.request(1);
            },
            onError: error => console.log('received error:' + error),
            onComplete: () => {
              console.log('ack complete');
              streamSpansStreamAcks();
            },
            onSubscribe: subscription => {
              _sub = subscription;
              _sub.request(1);
            },
          });
        },
        onError: err => console.log(err),
      });
    },
    onSubscribe: () => {},
  });
}, 5000);

let streamSpansStreamAcks = function() {
  console.log('Beginning to stream spans and acks');
  //reset count
  count = 0;
  let finalCount = 0;
  lastSpan = null;
  opname = 'streams two ways!';

  let _sub;
  client.streamSpansStreamAcks(spanStream, Buffer.alloc(0)).subscribe({
    onNext: ack => {
      console.log('received ack*');
      finalCount++;
      _sub.request(1);
    },
    onError: error => console.log('received error:' + error),
    onComplete: () => {
      console.log('ack complete after ' + finalCount + ' acks');
    },
    onSubscribe: subscription => {
      _sub = subscription;
      _sub.request(1);
    },
  });
};

function mapSpan(
  span,
  localService,
  remoteService,
  group,
  destination,
  shared,
) {
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
  } else {
    let kind = Span.Kind['CLIENT'];
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

function constructEndpoint(service) {
  const endpoint = new Endpoint();
  endpoint.setServiceName(service);
  //TODO: Figure this out for real
  endpoint.setIpv4('127.0.0.1');
  return endpoint;
}
