// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var proteus_testing_ping$pong_pb = require('../../proteus/testing/ping-pong_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var rsocket_options_pb = require('../../rsocket/options_pb.js');

var PingPongServiceClient = function () {
  function PingPongServiceClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.pingTrace = rsocket_rpc_tracing.traceSingle(tracer, "PingPongService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "ping"}, {"rsocket.rpc.role": "client"});
    this.pingMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "PingPongService", {"service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "ping"}, {"role": "client"});
    this.pingStreamTrace = rsocket_rpc_tracing.trace(tracer, "PingPongService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "pingStream"}, {"rsocket.rpc.role": "client"});
    this.pingStreamMetrics = rsocket_rpc_metrics.timed(meterRegistry, "PingPongService", {"service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "pingStream"}, {"role": "client"});
    this.pingFireAndForgetTrace = rsocket_rpc_tracing.traceSingle(tracer, "PingPongService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "pingFireAndForget"}, {"rsocket.rpc.role": "client"});
    this.pingFireAndForgetMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "PingPongService", {"service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "pingFireAndForget"}, {"role": "client"});
  }
  PingPongServiceClient.prototype.ping = function ping(message, metadata) {
    const map = {};
    return this.pingMetrics(
      this.pingTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.tracing.PingPongService', 'ping', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_testing_ping$pong_pb.Pong.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  PingPongServiceClient.prototype.pingStream = function pingStream(message, metadata) {
    const map = {};
    return this.pingStreamMetrics(
      this.pingStreamTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.tracing.PingPongService', 'pingStream', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_testing_ping$pong_pb.Pong.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  PingPongServiceClient.prototype.pingFireAndForget = function pingFireAndForget(message, metadata) {
    const map = {};
    this.pingFireAndForgetMetrics(new rsocket_flowable.Single(subscriber => {
      this.pingFireAndForgetTrace(map)(new rsocket_flowable.Single(innerSub => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.tracing.PingPongService', 'pingFireAndForget', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.fireAndForget({
          data: dataBuf,
          metadata: metadataBuf
        });
        innerSub.onSubscribe();
        innerSub.onComplete();
      })).subscribe({ onSubscribe: function onSubscribe() {subscriber.onSubscribe();}, onComplete: function onComplete() {subscriber.onComplete();} });
    })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
  };
  return PingPongServiceClient;
}();

exports.PingPongServiceClient = PingPongServiceClient;

var PingPongServiceServer = function () {
  function PingPongServiceServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.pingTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "PingPongService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "ping"}, {"rsocket.rpc.role": "server"});
    this.pingMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "PingPongService", {"service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "ping"}, {"role": "server"});
    this.pingStreamTrace = rsocket_rpc_tracing.traceAsChild(tracer, "PingPongService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "pingStream"}, {"rsocket.rpc.role": "server"});
    this.pingStreamMetrics = rsocket_rpc_metrics.timed(meterRegistry, "PingPongService", {"service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "pingStream"}, {"role": "server"});
    this.pingFireAndForgetTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "PingPongService", {"rsocket.rpc.service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "pingFireAndForget"}, {"rsocket.rpc.role": "server"});
    this.pingFireAndForgetMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "PingPongService", {"service": "io.netifi.proteus.tracing.PingPongService"}, {"method": "pingFireAndForget"}, {"role": "server"});
    this._channelSwitch = (payload, restOfMessages) => {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      let deserializedMessages;
      switch(method){
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    };
  }
  PingPongServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    if (payload.metadata == null) {
      throw new Error('metadata is empty');
    }
    var method = rsocket_rpc_frames.getMethod(payload.metadata);
    var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
    switch (method) {
      case 'pingFireAndForget':
        this.pingFireAndForgetMetrics(new rsocket_flowable.Single(subscriber => {
          this.pingFireAndForgetTrace(spanContext)(new rsocket_flowable.Single(innerSub => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            this._service.pingFireAndForget(proteus_testing_ping$pong_pb.Ping.deserializeBinary(binary), payload.metadata);
            innerSub.onSubscribe();
            innerSub.onComplete();
          }).subscribe({ onSubscribe: function onSubscribe() {subscriber.onSubscribe();}, onComplete: function onComplete() {subscriber.onComplete();} }));
        })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
        break;
      default:
        throw new Error('unknown method');
    }
  };
  PingPongServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'ping':
          return this.pingMetrics(
            this.pingTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .ping(proteus_testing_ping$pong_pb.Ping.deserializeBinary(binary), payload.metadata)
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
  PingPongServiceServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'pingStream':
          return this.pingStreamMetrics(
            this.pingStreamTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .pingStream(proteus_testing_ping$pong_pb.Ping.deserializeBinary(binary), payload.metadata)
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
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Flowable.error(error);
    }
  };
  PingPongServiceServer.prototype.requestChannel = function requestChannel(payloads) {
    let once = false;
    return new rsocket_flowable.Flowable(subscriber => {
      const payloadProxy = new rsocket_rpc_core.QueuingFlowableProcessor();
      payloads.subscribe({
        onNext: payload => {
          if(!once){
            once = true;
            try{
              let result = this._channelSwitch(payload, payloadProxy);
              result.subscribe(subscriber);
            } catch (error){
              subscriber.onError(error);
            }
          }
          payloadProxy.onNext(payload.data);
        },
        onError: error => {
          payloadProxy.onError(error);
        },
        onComplete: () => {
          payloadProxy.onComplete();
        },
        onSubscribe: subscription => {
          payloadProxy.onSubscribe(subscription);
        }
      });
    });
  };
  PingPongServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return PingPongServiceServer;
}();

exports.PingPongServiceServer = PingPongServiceServer;

