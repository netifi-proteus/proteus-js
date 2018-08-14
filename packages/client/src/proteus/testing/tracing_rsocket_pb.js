// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_flowable = require('rsocket-flowable');
var proteus_testing_tracing_pb = require('../../proteus/testing/tracing_pb.js');
var zipkin_proto3_zipkin_pb = require('../../zipkin/proto3/zipkin_pb.js');

var ProteusTracingServiceClient = function () {
  function ProteusTracingServiceClient(rs, tracer) {
    this._rs = rs;
    this._tracer = tracer;
    this.streamSpansTrace = rsocket_rpc_tracing.trace(tracer, "ProteusTracingService.streamSpans", {"proteus.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"proteus.type": "client"});
    this.sendSpanTrace = rsocket_rpc_tracing.traceSingle(tracer, "ProteusTracingService.sendSpan", {"proteus.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"proteus.type": "client"});
  }
  ProteusTracingServiceClient.prototype.streamSpans = function streamSpans(messages, metadata) {
    var once = false;
    const map = {};
    return this.streamSpansTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.tracing.ProteusTracingService', 'StreamSpans', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestChannel(messages.map(function (message) {
          var dataBuf = Buffer.from(message.serializeBinary());
          if (!once) {
            once = true;
            var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.tracing.ProteusTracingService', 'StreamSpans', Buffer.alloc(0), metadata || Buffer.alloc(0));
          } else {
            metadataBuf = Buffer.alloc(0);
          }
          return {
            data: dataBuf,
            metadata: metadataBuf
          };
        })).map(function (payload) {
          return proteus_testing_tracing_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  ProteusTracingServiceClient.prototype.sendSpan = function sendSpan(message, metadata) {
    const map = {};
    return this.sendSpanTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.tracing.ProteusTracingService', 'SendSpan', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_testing_tracing_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  return ProteusTracingServiceClient;
}();

exports.ProteusTracingServiceClient = ProteusTracingServiceClient;

var ProteusTracingServiceServer = function () {
  function ProteusTracingServiceServer(service, tracer) {
    this._service = service;
    this._tracer = tracer;
    this.streamSpansTrace = rsocket_rpc_tracing.traceAsChild(tracer, "ProteusTracingService.streamSpans", {"proteus.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"proteus.type": "server"});
    this.sendSpanTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "ProteusTracingService.sendSpan", {"proteus.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"proteus.type": "server"});
  }
  ProteusTracingServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  ProteusTracingServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'SendSpan':
          return this.sendSpanTrace(spanContext)(
            this._service
            .sendSpan(zipkin_proto3_zipkin_pb.Span.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        default:
          return rsocket_flowable.Single.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Single.error(error);
    }
  };
  ProteusTracingServiceServer.prototype.requestStream = function requestStream(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestStream() is not implemented'));
  };
  ProteusTracingServiceServer.prototype.requestChannel = function requestChannel(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestChannel() is not implemented'));
  };
  ProteusTracingServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return ProteusTracingServiceServer;
}();

exports.ProteusTracingServiceServer = ProteusTracingServiceServer;

