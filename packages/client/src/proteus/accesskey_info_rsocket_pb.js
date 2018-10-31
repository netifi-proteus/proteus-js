// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var proteus_accesskey_info_pb = require('../proteus/accesskey_info_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

var AccessKeyInfoServiceClient = function () {
  function AccessKeyInfoServiceClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.createAccessKeyTrace = rsocket_rpc_tracing.traceSingle(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "createAccessKey"}, {"rsocket.rpc.role": "client"});
    this.createAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "createAccessKey"}, {"role": "client"});
    this.removeAccessKeyTrace = rsocket_rpc_tracing.traceSingle(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "removeAccessKey"}, {"rsocket.rpc.role": "client"});
    this.removeAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "removeAccessKey"}, {"role": "client"});
    this.disableAccessKeyTrace = rsocket_rpc_tracing.traceSingle(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "disableAccessKey"}, {"rsocket.rpc.role": "client"});
    this.disableAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "disableAccessKey"}, {"role": "client"});
    this.enableAccessKeyTrace = rsocket_rpc_tracing.traceSingle(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "enableAccessKey"}, {"rsocket.rpc.role": "client"});
    this.enableAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "enableAccessKey"}, {"role": "client"});
    this.getAccessKeyTrace = rsocket_rpc_tracing.traceSingle(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "getAccessKey"}, {"rsocket.rpc.role": "client"});
    this.getAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "getAccessKey"}, {"role": "client"});
    this.getAccessKeysTrace = rsocket_rpc_tracing.trace(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "getAccessKeys"}, {"rsocket.rpc.role": "client"});
    this.getAccessKeysMetrics = rsocket_rpc_metrics.timed(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "getAccessKeys"}, {"role": "client"});
  }
  AccessKeyInfoServiceClient.prototype.createAccessKey = function createAccessKey(message, metadata) {
    const map = {};
    return this.createAccessKeyMetrics(
      this.createAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'CreateAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_accesskey_info_pb.AccessToken.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  AccessKeyInfoServiceClient.prototype.removeAccessKey = function removeAccessKey(message, metadata) {
    const map = {};
    return this.removeAccessKeyMetrics(
      this.removeAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'RemoveAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  AccessKeyInfoServiceClient.prototype.disableAccessKey = function disableAccessKey(message, metadata) {
    const map = {};
    return this.disableAccessKeyMetrics(
      this.disableAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'DisableAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  AccessKeyInfoServiceClient.prototype.enableAccessKey = function enableAccessKey(message, metadata) {
    const map = {};
    return this.enableAccessKeyMetrics(
      this.enableAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'EnableAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  AccessKeyInfoServiceClient.prototype.getAccessKey = function getAccessKey(message, metadata) {
    const map = {};
    return this.getAccessKeyMetrics(
      this.getAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'GetAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  AccessKeyInfoServiceClient.prototype.getAccessKeys = function getAccessKeys(message, metadata) {
    const map = {};
    return this.getAccessKeysMetrics(
      this.getAccessKeysTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'GetAccessKeys', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return AccessKeyInfoServiceClient;
}();

exports.AccessKeyInfoServiceClient = AccessKeyInfoServiceClient;

var AccessKeyInfoServiceServer = function () {
  function AccessKeyInfoServiceServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.createAccessKeyTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "createAccessKey"}, {"rsocket.rpc.role": "server"});
    this.createAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "createAccessKey"}, {"role": "server"});
    this.removeAccessKeyTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "removeAccessKey"}, {"rsocket.rpc.role": "server"});
    this.removeAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "removeAccessKey"}, {"role": "server"});
    this.disableAccessKeyTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "disableAccessKey"}, {"rsocket.rpc.role": "server"});
    this.disableAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "disableAccessKey"}, {"role": "server"});
    this.enableAccessKeyTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "enableAccessKey"}, {"rsocket.rpc.role": "server"});
    this.enableAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "enableAccessKey"}, {"role": "server"});
    this.getAccessKeyTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "getAccessKey"}, {"rsocket.rpc.role": "server"});
    this.getAccessKeyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "getAccessKey"}, {"role": "server"});
    this.getAccessKeysTrace = rsocket_rpc_tracing.traceAsChild(tracer, "AccessKeyInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "getAccessKeys"}, {"rsocket.rpc.role": "server"});
    this.getAccessKeysMetrics = rsocket_rpc_metrics.timed(meterRegistry, "AccessKeyInfoService", {"service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"method": "getAccessKeys"}, {"role": "server"});
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
  AccessKeyInfoServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  AccessKeyInfoServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'CreateAccessKey':
          return this.createAccessKeyMetrics(
            this.createAccessKeyTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .createAccessKey(proteus_accesskey_info_pb.AccessKeyParameters.deserializeBinary(binary), payload.metadata)
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
        case 'RemoveAccessKey':
          return this.removeAccessKeyMetrics(
            this.removeAccessKeyTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .removeAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(binary), payload.metadata)
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
        case 'DisableAccessKey':
          return this.disableAccessKeyMetrics(
            this.disableAccessKeyTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .disableAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(binary), payload.metadata)
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
        case 'EnableAccessKey':
          return this.enableAccessKeyMetrics(
            this.enableAccessKeyTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .enableAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(binary), payload.metadata)
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
        case 'GetAccessKey':
          return this.getAccessKeyMetrics(
            this.getAccessKeyTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .getAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(binary), payload.metadata)
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
  AccessKeyInfoServiceServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'GetAccessKeys':
          return this.getAccessKeysMetrics(
            this.getAccessKeysTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .getAccessKeys(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
  AccessKeyInfoServiceServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  AccessKeyInfoServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return AccessKeyInfoServiceServer;
}();

exports.AccessKeyInfoServiceServer = AccessKeyInfoServiceServer;

