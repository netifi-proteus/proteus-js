'use strict';

const {ZipkinTracingService} = require('../../dist/tracing/tracingService');
const {BasicTracer} = require('../../dist/tracing/tracer');
const {Ping} = require('../proteus/testing/ping-pong_pb');
const {
  PingPongServiceClient,
  PingPongServiceServer,
} = require('../proteus/testing/ping-pong_rsocket_pb');
const {
  ProteusTracingServiceServer,
} = require('../proteus/testing/tracing_rsocket_pb');
const Proteus = require('../../dist/Proteus').default;
const {PongService} = require('../../dist/tracing/pongService');
const {BufferEncoders} = require('rsocket-core');
const RSocketTcpClient = require('rsocket-tcp-client').default;
const ProteusTlsClient = require('../../dist/ProteusTlsClient').default;
const WebSocket = require('ws');
global.WebSocket = WebSocket;

const url = 'wss://localhost:8101/';
const tcpConnection = new ProteusTlsClient(
  {
    host: 'localhost',
    port: 8001,
    rejectUnauthorized: false,
  },
  BufferEncoders,
);

// let tracingServiceGateway = Proteus.create({
//   setup: {
//     group: 'com.netifi.proteus.tracing',
//     accessKey: 9007199254740991,
//     accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
//   },
//   transport: {
//     connection: new ProteusTlsClient(
//       {
//         host: 'localhost',
//         port: 8001,
//         rejectUnauthorized: false,
//       },
//       BufferEncoders,
//     ),
//     // url,
//     // wsCreator: url =>
//     //   new WebSocket(url, {
//     //     rejectUnauthorized: false,
//     //   }),
//   },
// });
//
// tracingServiceGateway.addService(
//   'io.netifi.proteus.tracing.ProteusTracingService',
//   new ProteusTracingServiceServer(
//     new ZipkinTracingService('localhost', 9411, '/api/v2/spans'),
//   ),
// );
// console.log('Connecting to localhost for tracing service...');
// tracingServiceGateway._connect().subscribe({
//   onComplete: val => {
//     console.log('Connected:' + val);
//   },
//   onError: err => {
//     console.log('Failed to connect:' + err);
//   },
//   onSubscribe: () => {},
// });

// setTimeout(() => {
const clientOneId = 'thingOne';
const clientGatewayOne = Proteus.create({
  setup: {
    group: 'pinger',
    destination: clientOneId,
    accessKey: 9007199254740991,
    accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
  },
  transport: {
    connection: new ProteusTlsClient(
      {
        host: 'localhost',
        port: 8001,
        rejectUnauthorized: false,
      },
      BufferEncoders,
    ),
    url,
    wsCreator: url =>
      new WebSocket(url, {
        rejectUnauthorized: false,
      }),
  },
});

const clientTwoId = 'thingTwo';
const clientGatewayTwo = Proteus.create({
  setup: {
    group: 'ponger',
    destination: clientTwoId,
    accessKey: 9007199254740991,
    accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
  },
  transport: {
    connection: new ProteusTlsClient(
      {
        host: 'localhost',
        port: 8001,
        rejectUnauthorized: false,
      },
      BufferEncoders,
    ),
    url,
    wsCreator: url =>
      new WebSocket(url, {
        rejectUnauthorized: false,
      }),
  },
});

clientGatewayOne.addService(
  'io.netifi.proteus.tracing.PingPongService',
  new PingPongServiceServer(
    new PongService(),
    new BasicTracer(
      {
        /* default sampler/recorder */
      },
      clientGatewayOne,
      null /* no url needed */,
      'io.netifi.proteus.tracing.PingPongService',
      null,
      true,
    ),
  ),
);

const clientOne = new PingPongServiceClient(
  clientGatewayOne.group('ponger'),
  new BasicTracer(
    {
      /* default sampler/recorder */
    },
    clientGatewayOne,
    null /* no url needed */,
    'Integration.Test',
    'io.netifi.proteus.tracing.PingPongService',
    false,
  ),
);

clientGatewayTwo.addService(
  'io.netifi.proteus.tracing.PingPongService',
  new PingPongServiceServer(
    new PongService(),
    new BasicTracer(
      {
        /* default sampler/recorder */
      },
      clientGatewayTwo,
      null /* no url needed */,
      'io.netifi.proteus.tracing.PingPongService',
      null,
      false,
    ),
  ),
);
clientGatewayTwo._connect();

const clientTwo = new PingPongServiceClient(
  clientGatewayOne.group('pinger'),
  new BasicTracer(
    {
      /* default sampler/recorder */
    },
    clientGatewayTwo,
    null /* no url needed */,
    'Integration.Test',
    'io.netifi.proteus.tracing.PingPongService',
    false,
  ),
);

function outerPing(client, clientId) {
  const ping = new Ping();
  ping.setMessage('Please respond once to me:' + clientId);
  console.log('Pinging: ' + clientId);
  client.ping(ping, Buffer.alloc(0)).subscribe({
    onComplete: val => {
      console.log('Received response, pinging again...');
      setTimeout(() => outerPing(client, clientId), 1000);
    },
    onError: err => console.log(err),
    onSubscribe: () => {},
  });
}

function outerFnf(client, clientId) {
  const ping = new Ping();
  ping.setMessage('Hi from ' + clientId);
  console.log('Pinging FnF: ' + clientId);
  client.pingFireAndForget(ping, Buffer.alloc(0));
  setTimeout(() => outerFnf(client, clientId), 1250);
}

function outerStream(client, clientId) {
  const ping = new Ping();
  ping.setMessage('Give me all you got, from ' + clientId);
  console.log('Pinging for stream: ' + clientId);
  let _subscription;
  client.pingStream(ping, Buffer.alloc(0)).subscribe({
    onComplete: () => {
      console.log('completed stream');
      setTimeout(() => {
        outerStream(client, clientId);
      }, 2500);
    },
    onError: err => console.log(err),
    onNext: val => {
      console.log('STREAM: ' + val);
      _subscription.request(1);
    },
    onSubscribe: subscription => {
      _subscription = subscription;
      _subscription.request(1);
    },
  });
}

setTimeout(() => {
  console.log('single ping, client one');
  outerPing(clientOne, clientOneId);
  console.log('fnf ping, client one');
  outerFnf(clientOne, clientOneId);
  console.log('stream ping, client one');
  outerStream(clientOne, clientOneId);

  console.log('single ping, client two');
  outerPing(clientTwo, clientTwoId);
  console.log('fnf ping, client two');
  outerFnf(clientTwo, clientTwoId);
  console.log('stream ping, client two');
  outerStream(clientTwo, clientTwoId);
}, 2500);

const http = require('http');
http
  .createServer((req, res) => {
    res.write("Shhhh, I'm working"); // write a response to the client
    res.end(); // end the response
  })
  .listen(9091);
