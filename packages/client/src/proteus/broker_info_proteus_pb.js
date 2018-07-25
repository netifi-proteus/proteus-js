// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var rsocket_flowable = require('rsocket-flowable');
var proteus_broker_info_pb = require('../proteus/broker_info_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

var BrokerInfoServiceClient = function () {
  function BrokerInfoServiceClient(rs) {
    this._rs = rs;
  }
  BrokerInfoServiceClient.prototype.brokers = function brokers(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Brokers', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Broker.deserializeBinary(payload.data);
    });
  };
  BrokerInfoServiceClient.prototype.groups = function groups(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Groups', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Group.deserializeBinary(payload.data);
    });
  };
  BrokerInfoServiceClient.prototype.destinations = function destinations(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Destinations', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Destination.deserializeBinary(payload.data);
    });
  };
  BrokerInfoServiceClient.prototype.destinationsByBrokerAndGroup = function destinationsByBrokerAndGroup(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'DestinationsByBrokerAndGroup', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Destination.deserializeBinary(payload.data);
    });
  };
  BrokerInfoServiceClient.prototype.destinationsByGroup = function destinationsByGroup(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'DestinationsByGroup', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Destination.deserializeBinary(payload.data);
    });
  };
  BrokerInfoServiceClient.prototype.brokersWithGroup = function brokersWithGroup(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'BrokersWithGroup', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Broker.deserializeBinary(payload.data);
    });
  };
  BrokerInfoServiceClient.prototype.brokerWithDestination = function brokerWithDestination(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'BrokerWithDestination', metadata || Buffer.alloc(0));
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Broker.deserializeBinary(payload.data);
    });
  };
  BrokerInfoServiceClient.prototype.streamGroupEvents = function streamGroupEvents(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamGroupEvents', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Event.deserializeBinary(payload.data);
    });
  };
  BrokerInfoServiceClient.prototype.streamDestinationEvents = function streamDestinationEvents(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamDestinationEvents', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Event.deserializeBinary(payload.data);
    });
  };
  BrokerInfoServiceClient.prototype.streamBrokerEvents = function streamBrokerEvents(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamBrokerEvents', metadata || Buffer.alloc(0));
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      return proteus_broker_info_pb.Event.deserializeBinary(payload.data);
    });
  };
  return BrokerInfoServiceClient;
}();

exports.BrokerInfoServiceClient = BrokerInfoServiceClient;

var BrokerInfoServiceServer = function () {
  function BrokerInfoServiceServer(service) {
    this._service = service;
  }
  BrokerInfoServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  BrokerInfoServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      switch (method) {
        case 'BrokerWithDestination':
          return this._service
            .brokerWithDestination(proteus_broker_info_pb.Destination.deserializeBinary(payload.data), payload.metadata)
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
  BrokerInfoServiceServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      switch (method) {
        case 'Brokers':
          return this._service
            .brokers(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'Groups':
          return this._service
            .groups(proteus_broker_info_pb.Broker.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'Destinations':
          return this._service
            .destinations(proteus_broker_info_pb.Broker.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'DestinationsByBrokerAndGroup':
          return this._service
            .destinationsByBrokerAndGroup(proteus_broker_info_pb.Group.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'DestinationsByGroup':
          return this._service
            .destinationsByGroup(proteus_broker_info_pb.Group.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'BrokersWithGroup':
          return this._service
            .brokersWithGroup(proteus_broker_info_pb.Group.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'streamGroupEvents':
          return this._service
            .streamGroupEvents(proteus_broker_info_pb.Group.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'streamDestinationEvents':
          return this._service
            .streamDestinationEvents(proteus_broker_info_pb.Destination.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            });
        case 'streamBrokerEvents':
          return this._service
            .streamBrokerEvents(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
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
  BrokerInfoServiceServer.prototype.requestChannel = function requestChannel(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestChannel() is not implemented'));
  };
  BrokerInfoServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return BrokerInfoServiceServer;
}();

exports.BrokerInfoServiceServer = BrokerInfoServiceServer;

