// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var proteus_tracing = require('proteus-js-tracing');
var rsocket_flowable = require('rsocket-flowable');
var proteus_accesskey_info_pb = require('../proteus/accesskey_info_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

var AccessKeyInfoServiceClient = function () {
  function AccessKeyInfoServiceClient(rs, tracer) {
    this._rs = rs;
    this._tracer = tracer;
    this.createAccessKeyTrace = proteus_tracing.traceSingle(tracer, "AccessKeyInfoService.createAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "client"});
    this.removeAccessKeyTrace = proteus_tracing.traceSingle(tracer, "AccessKeyInfoService.removeAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "client"});
    this.disableAccessKeyTrace = proteus_tracing.traceSingle(tracer, "AccessKeyInfoService.disableAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "client"});
    this.enableAccessKeyTrace = proteus_tracing.traceSingle(tracer, "AccessKeyInfoService.enableAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "client"});
    this.getAccessKeyTrace = proteus_tracing.traceSingle(tracer, "AccessKeyInfoService.getAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "client"});
    this.getAccessKeysTrace = proteus_tracing.trace(tracer, "AccessKeyInfoService.getAccessKeys", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "client"});
  }
  AccessKeyInfoServiceClient.prototype.createAccessKey = function createAccessKey(message, metadata) {
    const map = {};
    return this.createAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'CreateAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_accesskey_info_pb.AccessToken.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  AccessKeyInfoServiceClient.prototype.removeAccessKey = function removeAccessKey(message, metadata) {
    const map = {};
    return this.removeAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'RemoveAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  AccessKeyInfoServiceClient.prototype.disableAccessKey = function disableAccessKey(message, metadata) {
    const map = {};
    return this.disableAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'DisableAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  AccessKeyInfoServiceClient.prototype.enableAccessKey = function enableAccessKey(message, metadata) {
    const map = {};
    return this.enableAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'EnableAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  AccessKeyInfoServiceClient.prototype.getAccessKey = function getAccessKey(message, metadata) {
    const map = {};
    return this.getAccessKeyTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'GetAccessKey', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  AccessKeyInfoServiceClient.prototype.getAccessKeys = function getAccessKeys(message, metadata) {
    const map = {};
    return this.getAccessKeysTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'GetAccessKeys', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  return AccessKeyInfoServiceClient;
}();

exports.AccessKeyInfoServiceClient = AccessKeyInfoServiceClient;

var AccessKeyInfoServiceServer = function () {
  function AccessKeyInfoServiceServer(service, tracer) {
    this._service = service;
    this._tracer = tracer;
    this.createAccessKeyTrace = proteus_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService.createAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "server"});
    this.removeAccessKeyTrace = proteus_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService.removeAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "server"});
    this.disableAccessKeyTrace = proteus_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService.disableAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "server"});
    this.enableAccessKeyTrace = proteus_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService.enableAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "server"});
    this.getAccessKeyTrace = proteus_tracing.traceSingleAsChild(tracer, "AccessKeyInfoService.getAccessKey", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "server"});
    this.getAccessKeysTrace = proteus_tracing.traceAsChild(tracer, "AccessKeyInfoService.getAccessKeys", {"proteus.service": "io.netifi.proteus.broker.access.AccessKeyInfoService"}, {"proteus.type": "server"});
  }
  AccessKeyInfoServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  AccessKeyInfoServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      var spanContext = proteus_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'CreateAccessKey':
          return this.createAccessKeyTrace(spanContext)(
            this._service
            .createAccessKey(proteus_accesskey_info_pb.AccessKeyParameters.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'RemoveAccessKey':
          return this.removeAccessKeyTrace(spanContext)(
            this._service
            .removeAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'DisableAccessKey':
          return this.disableAccessKeyTrace(spanContext)(
            this._service
            .disableAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'EnableAccessKey':
          return this.enableAccessKeyTrace(spanContext)(
            this._service
            .enableAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'GetAccessKey':
          return this.getAccessKeyTrace(spanContext)(
            this._service
            .getAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(payload.data), payload.metadata)
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
  AccessKeyInfoServiceServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      var spanContext = proteus_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'GetAccessKeys':
          return this.getAccessKeysTrace(spanContext)(
            this._service
              .getAccessKeys(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
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
  AccessKeyInfoServiceServer.prototype.requestChannel = function requestChannel(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestChannel() is not implemented'));
  };
  AccessKeyInfoServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return AccessKeyInfoServiceServer;
}();

exports.AccessKeyInfoServiceServer = AccessKeyInfoServiceServer;

