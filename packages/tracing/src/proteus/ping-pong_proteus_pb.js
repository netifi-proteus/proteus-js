// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var proteus_tracing = require('proteus-js-tracing');
var rsocket_flowable = require('rsocket-flowable');
var proteus_ping$pong_pb = require('../proteus/ping-pong_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

var PingPongServiceClient = function () {
  function PingPongServiceClient(rs, tracer) {
    this._rs = rs;
    this._tracer = tracer;
    this.pingTrace = proteus_tracing.traceSingle(tracer, "PingPongService.ping", {"proteus.service": "io.netifi.proteus.tracing.PingPongService"}, {"proteus.type": "client"});
    this.pingStreamTrace = proteus_tracing.trace(tracer, "PingPongService.pingStream", {"proteus.service": "io.netifi.proteus.tracing.PingPongService"}, {"proteus.type": "client"});
    this.pingFireAndForgetTrace = proteus_tracing.traceSingle(tracer, "PingPongService.pingFireAndForget", {"proteus.service": "io.netifi.proteus.tracing.PingPongService"}, {"proteus.type": "client"});
  }
  PingPongServiceClient.prototype.ping = function ping(message, metadata) {
    const map = {};
    return this.pingTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.tracing.PingPongService', 'ping', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_ping$pong_pb.Pong.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  PingPongServiceClient.prototype.pingStream = function pingStream(message, metadata) {
    const map = {};
    return this.pingStreamTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.tracing.PingPongService', 'pingStream', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_ping$pong_pb.Pong.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  PingPongServiceClient.prototype.pingFireAndForget = function pingFireAndForget(message, metadata) {
    const map = {};
    return this.pingFireAndForgetTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.tracing.PingPongService', 'pingFireAndForget', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return google_protobuf_empty_pb.Empty.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  return PingPongServiceClient;
}();

exports.PingPongServiceClient = PingPongServiceClient;

var PingPongServiceServer = function () {
  function PingPongServiceServer(service, tracer) {
    this._service = service;
    this._tracer = tracer;
    this.pingTrace = proteus_tracing.traceSingleAsChild(tracer, "PingPongService.ping", {"proteus.service": "io.netifi.proteus.tracing.PingPongService"}, {"proteus.type": "server"});
    this.pingStreamTrace = proteus_tracing.traceAsChild(tracer, "PingPongService.pingStream", {"proteus.service": "io.netifi.proteus.tracing.PingPongService"}, {"proteus.type": "server"});
    this.pingFireAndForgetTrace = proteus_tracing.traceSingleAsChild(tracer, "PingPongService.pingFireAndForget", {"proteus.service": "io.netifi.proteus.tracing.PingPongService"}, {"proteus.type": "server"});
  }
  PingPongServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  PingPongServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      var spanContext = proteus_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'ping':
          return this.pingTrace(spanContext)(
            this._service
            .ping(proteus_ping$pong_pb.Ping.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'pingFireAndForget':
          return this.pingFireAndForgetTrace(spanContext)(
            this._service
            .pingFireAndForget(proteus_ping$pong_pb.Ping.deserializeBinary(payload.data), payload.metadata)
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
  PingPongServiceServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      var spanContext = proteus_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'pingStream':
          return this.pingStreamTrace(spanContext)(
            this._service
              .pingStream(proteus_ping$pong_pb.Ping.deserializeBinary(payload.data), payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Flowable.error(error);
    }
  };
  PingPongServiceServer.prototype.requestChannel = function requestChannel(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestChannel() is not implemented'));
  };
  PingPongServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return PingPongServiceServer;
}();

exports.PingPongServiceServer = PingPongServiceServer;

