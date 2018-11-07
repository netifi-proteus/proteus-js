// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var proteus_testing_tracing_pb = require('../../proteus/testing/tracing_pb.js');
var zipkin_proto3_zipkin_pb = require('../../zipkin/proto3/zipkin_pb.js');

var ProteusTracingServiceClient = function () {
  function ProteusTracingServiceClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.streamSpansTrace = rsocket_rpc_tracing.trace(tracer, "ProteusTracingService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "streamSpans"}, {"rsocket.rpc.role": "client"});
    this.streamSpansMetrics = rsocket_rpc_metrics.timed(meterRegistry, "ProteusTracingService", {"service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "streamSpans"}, {"role": "client"});
    this.streamSpansStreamAcksTrace = rsocket_rpc_tracing.trace(tracer, "ProteusTracingService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "streamSpansStreamAcks"}, {"rsocket.rpc.role": "client"});
    this.streamSpansStreamAcksMetrics = rsocket_rpc_metrics.timed(meterRegistry, "ProteusTracingService", {"service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "streamSpansStreamAcks"}, {"role": "client"});
    this.sendSpanTrace = rsocket_rpc_tracing.traceSingle(tracer, "ProteusTracingService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "sendSpan"}, {"rsocket.rpc.role": "client"});
    this.sendSpanMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "ProteusTracingService", {"service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "sendSpan"}, {"role": "client"});
  }
  ProteusTracingServiceClient.prototype.streamSpans = function streamSpans(messages, metadata) {
    const map = {};
    return this.streamSpansMetrics(
      this.streamSpansTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf;
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf ;
          this._rs.requestChannel(messages.map(function (message) {
            dataBuf = Buffer.from(message.serializeBinary());
            metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.tracing.ProteusTracingService', 'StreamSpans', tracingMetadata, metadata || Buffer.alloc(0));
            return {
              data: dataBuf,
              metadata: metadataBuf
            };
          })).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_testing_tracing_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  ProteusTracingServiceClient.prototype.streamSpansStreamAcks = function streamSpansStreamAcks(messages, metadata) {
    const map = {};
    return this.streamSpansStreamAcksMetrics(
      this.streamSpansStreamAcksTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf;
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf ;
          this._rs.requestChannel(messages.map(function (message) {
            dataBuf = Buffer.from(message.serializeBinary());
            metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.tracing.ProteusTracingService', 'StreamSpansStreamAcks', tracingMetadata, metadata || Buffer.alloc(0));
            return {
              data: dataBuf,
              metadata: metadataBuf
            };
          })).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_testing_tracing_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  ProteusTracingServiceClient.prototype.sendSpan = function sendSpan(message, metadata) {
    const map = {};
    return this.sendSpanMetrics(
      this.sendSpanTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.tracing.ProteusTracingService', 'SendSpan', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_testing_tracing_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return ProteusTracingServiceClient;
}();

exports.ProteusTracingServiceClient = ProteusTracingServiceClient;

var ProteusTracingServiceServer = function () {
  function ProteusTracingServiceServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.streamSpansTrace = rsocket_rpc_tracing.traceAsChild(tracer, "ProteusTracingService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "streamSpans"}, {"rsocket.rpc.role": "server"});
    this.streamSpansMetrics = rsocket_rpc_metrics.timed(meterRegistry, "ProteusTracingService", {"service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "streamSpans"}, {"role": "server"});
    this.streamSpansStreamAcksTrace = rsocket_rpc_tracing.traceAsChild(tracer, "ProteusTracingService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "streamSpansStreamAcks"}, {"rsocket.rpc.role": "server"});
    this.streamSpansStreamAcksMetrics = rsocket_rpc_metrics.timed(meterRegistry, "ProteusTracingService", {"service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "streamSpansStreamAcks"}, {"role": "server"});
    this.sendSpanTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "ProteusTracingService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "sendSpan"}, {"rsocket.rpc.role": "server"});
    this.sendSpanMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "ProteusTracingService", {"service": "io.netifi.proteus.tracing.ProteusTracingService"}, {"method": "sendSpan"}, {"role": "server"});
    this._channelSwitch = (payload, restOfMessages) => {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      let deserializedMessages;
      switch(method){
        case 'StreamSpans':
          deserializedMessages = restOfMessages.map(payload => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return zipkin_proto3_zipkin_pb.Span.deserializeBinary(binary);
          });
          return this.streamSpansMetrics(
            this.streamSpansTrace(spanContext)(
              this._service
                .streamSpans(deserializedMessages, payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                })
              )
            );
        case 'StreamSpansStreamAcks':
          deserializedMessages = restOfMessages.map(payload => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return zipkin_proto3_zipkin_pb.Span.deserializeBinary(binary);
          });
          return this.streamSpansStreamAcksMetrics(
            this.streamSpansStreamAcksTrace(spanContext)(
              this._service
                .streamSpansStreamAcks(deserializedMessages, payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                })
              )
            );
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    };
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
          return this.sendSpanMetrics(
            this.sendSpanTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .sendSpan(zipkin_proto3_zipkin_pb.Span.deserializeBinary(binary), payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                }).subscribe(subscriber);
              }
            )
          )
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
  ProteusTracingServiceServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  ProteusTracingServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return ProteusTracingServiceServer;
}();

exports.ProteusTracingServiceServer = ProteusTracingServiceServer;

