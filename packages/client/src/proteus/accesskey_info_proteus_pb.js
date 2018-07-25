// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var rsocket_flowable = require('rsocket-flowable');
var proteus_accesskey_info_pb = require('../proteus/accesskey_info_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

var AccessKeyInfoServiceClient = function () {
  function AccessKeyInfoServiceClient(rs) {
    this._rs = rs;
  }
  AccessKeyInfoServiceClient.prototype.addAccessKey = function addAccessKey(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'AddAccessKey', metadata || Buffer.alloc(0));
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
    });
  };
  AccessKeyInfoServiceClient.prototype.removeAccessKey = function removeAccessKey(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'RemoveAccessKey', metadata || Buffer.alloc(0));
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
    });
  };
  AccessKeyInfoServiceClient.prototype.disableAccessKey = function disableAccessKey(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'DisableAccessKey', metadata || Buffer.alloc(0));
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
    });
  };
  AccessKeyInfoServiceClient.prototype.enableAccessKey = function enableAccessKey(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'EnableAccessKey', metadata || Buffer.alloc(0));
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
    });
  };
  AccessKeyInfoServiceClient.prototype.getAccessKey = function getAccessKey(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'GetAccessKey', metadata || Buffer.alloc(0));
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
    });
  };
  AccessKeyInfoServiceClient.prototype.getAccessKeys = function getAccessKeys(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.access.AccessKeyInfoService', 'GetAccessKeys', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_accesskey_info_pb.AccessTokenInfo.deserializeBinary(payload.data);
    });
  };
  return AccessKeyInfoServiceClient;
}();

exports.AccessKeyInfoServiceClient = AccessKeyInfoServiceClient;

var AccessKeyInfoServiceServer = function () {
  function AccessKeyInfoServiceServer(service) {
    this._service = service;
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
      switch (method) {
        case 'AddAccessKey':
          return this._service
            .addAccessKey(proteus_accesskey_info_pb.AccessToken.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'RemoveAccessKey':
          return this._service
            .removeAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'DisableAccessKey':
          return this._service
            .disableAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'EnableAccessKey':
          return this._service
            .enableAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'GetAccessKey':
          return this._service
            .getAccessKey(proteus_accesskey_info_pb.AccessKey.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
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
      switch (method) {
        case 'GetAccessKeys':
          return this._service
            .getAccessKeys(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
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

