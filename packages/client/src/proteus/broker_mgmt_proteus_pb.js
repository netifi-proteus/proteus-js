// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var rsocket_flowable = require('rsocket-flowable');
var proteus_broker_mgmt_pb = require('../proteus/broker_mgmt_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var proteus_broker_info_pb = require('../proteus/broker_info_pb.js');

var BrokerManagementServiceClient = function () {
  function BrokerManagementServiceClient(rs) {
    this._rs = rs;
  }
  // Shutdowns down a broker process
  BrokerManagementServiceClient.prototype.shutdown = function shutdown(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'shutdown', metadata);
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return google_protobuf_empty_pb.Empty.deserializeBinary(payload.data);
    });
  };
  // Broker leaves the cluster, but stays running
  BrokerManagementServiceClient.prototype.leave = function leave(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'leave', metadata);
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
    });
  };
  // Rejoins the cluster it  has seed information for
  BrokerManagementServiceClient.prototype.rejoin = function rejoin(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'rejoin', metadata);
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
    });
  };
  // Tells the Broker to join using the provided Brokers
  BrokerManagementServiceClient.prototype.join = function join(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'join', metadata);
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
    });
  };
  // Closes connections to a specific set of destinations
  BrokerManagementServiceClient.prototype.closeDestination = function closeDestination(messages, metadata) {
    var once = false;
    return this._rs.requestChannel(messages.map(function (message) {
      var dataBuf = Buffer.from(message.serializeBinary());
      if (!once) {
        once = true;
        var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeDestination', metadata);
      } else {
        metadataBuf = Buffer.alloc(0);
      }
      return {
        data: dataBuf,
        metadata: metadataBuf
      };
    })).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
    });
  };
  // Closes connections to a specific set of groups
  BrokerManagementServiceClient.prototype.closeGroup = function closeGroup(messages, metadata) {
    var once = false;
    return this._rs.requestChannel(messages.map(function (message) {
      var dataBuf = Buffer.from(message.serializeBinary());
      if (!once) {
        once = true;
        var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeGroup', metadata);
      } else {
        metadataBuf = Buffer.alloc(0);
      }
      return {
        data: dataBuf,
        metadata: metadataBuf
      };
    })).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
    });
  };
  // Closes connections to a specific set of brokers
  BrokerManagementServiceClient.prototype.closeBroker = function closeBroker(messages, metadata) {
    var once = false;
    return this._rs.requestChannel(messages.map(function (message) {
      var dataBuf = Buffer.from(message.serializeBinary());
      if (!once) {
        once = true;
        var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeBroker', metadata);
      } else {
        metadataBuf = Buffer.alloc(0);
      }
      return {
        data: dataBuf,
        metadata: metadataBuf
      };
    })).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
    });
  };
  // Closes all connections on the broker - except broker to broker connections
  BrokerManagementServiceClient.prototype.closeDestinations = function closeDestinations(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeDestinations', metadata);
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
    });
  };
  // Closes connections to all other brokers
  BrokerManagementServiceClient.prototype.closeBrokers = function closeBrokers(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeBrokers', metadata);
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
    });
  };
  // Closes all connections on the broker including broker to broker connections
  BrokerManagementServiceClient.prototype.closeAll = function closeAll(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeAll', metadata);
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
    });
  };
  return BrokerManagementServiceClient;
}();

exports.BrokerManagementServiceClient = BrokerManagementServiceClient;

var BrokerManagementServiceServer = function () {
  function BrokerManagementServiceServer(service) {
    this._service = service;
  }
  BrokerManagementServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      switch (method) {
        case 'shutdown':
          return this._service.shutdown(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata);
        default:
          return rsocket_flowable.Single.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Single.error(error);
    }
  };
  BrokerManagementServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      switch (method) {
        case 'leave':
          return this._service.leave(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata);
        case 'rejoin':
          return this._service.rejoin(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata);
        case 'join':
          return this._service.join(proteus_broker_mgmt_pb.Brokers.deserializeBinary(payload.data), payload.metadata);
        case 'closeDestinations':
          return this._service.closeDestinations(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata);
        case 'closeBrokers':
          return this._service.closeBrokers(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata);
        case 'closeAll':
          return this._service.closeAll(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata);
        default:
          return rsocket_flowable.Single.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Single.error(error);
    }
  };
  BrokerManagementServiceServer.prototype.requestStream = function requestStream(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestStream() is not implemented'));
  };
  BrokerManagementServiceServer.prototype.requestChannel = function requestChannel(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestChannel() is not implemented'));
  };
  BrokerManagementServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return BrokerManagementServiceServer;
}();

exports.BrokerManagementServiceServer = BrokerManagementServiceServer;

