// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var proteus_tracing = require('proteus-js-tracing');
var rsocket_flowable = require('rsocket-flowable');
var proteus_broker_mgmt_pb = require('../proteus/broker_mgmt_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var proteus_broker_info_pb = require('../proteus/broker_info_pb.js');

var BrokerManagementServiceClient = function () {
  function BrokerManagementServiceClient(rs, tracer) {
    this._rs = rs;
    this._tracer = tracer;
    this.shutdownTrace = proteus_tracing.traceSingle(tracer, "BrokerManagementService.shutdown", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.leaveTrace = proteus_tracing.traceSingle(tracer, "BrokerManagementService.leave", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.rejoinTrace = proteus_tracing.traceSingle(tracer, "BrokerManagementService.rejoin", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.joinTrace = proteus_tracing.traceSingle(tracer, "BrokerManagementService.join", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeDestinationTrace = proteus_tracing.trace(tracer, "BrokerManagementService.closeDestination", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeGroupTrace = proteus_tracing.trace(tracer, "BrokerManagementService.closeGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeBrokerTrace = proteus_tracing.trace(tracer, "BrokerManagementService.closeBroker", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeDestinationsTrace = proteus_tracing.traceSingle(tracer, "BrokerManagementService.closeDestinations", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeBrokersTrace = proteus_tracing.traceSingle(tracer, "BrokerManagementService.closeBrokers", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeAllTrace = proteus_tracing.traceSingle(tracer, "BrokerManagementService.closeAll", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
  }
  // Shutdowns down a broker process
  BrokerManagementServiceClient.prototype.shutdown = function shutdown(message, metadata) {
    const map = {};
    this.shutdownTrace(map)(new rsocket_flowable.Single(function (subscriber) {
      subscriber.onSubscribe();
      subscriber.onComplete();
    })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
    var dataBuf = Buffer.from(message.serializeBinary());
    var tracingMetadata = proteus_tracing.mapToBuffer(map);
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'shutdown', tracingMetadata, metadata || Buffer.alloc(0));
    this._rs.fireAndForget({
      data: dataBuf,
      metadata: metadataBuf
    });
  };
  // Broker leaves the cluster, but stays running
  BrokerManagementServiceClient.prototype.leave = function leave(message, metadata) {
    const map = {};
    return this.leaveTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'leave', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  // Rejoins the cluster it  has seed information for
  BrokerManagementServiceClient.prototype.rejoin = function rejoin(message, metadata) {
    const map = {};
    return this.rejoinTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'rejoin', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  // Tells the Broker to join using the provided Brokers
  BrokerManagementServiceClient.prototype.join = function join(message, metadata) {
    const map = {};
    return this.joinTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'join', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  // Closes connections to a specific set of destinations
  BrokerManagementServiceClient.prototype.closeDestination = function closeDestination(messages, metadata) {
    var once = false;
    const map = {};
    return this.closeDestinationTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeDestination', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestChannel(messages.map(function (message) {
          var dataBuf = Buffer.from(message.serializeBinary());
          if (!once) {
            once = true;
            var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeDestination', Buffer.alloc(0), metadata || Buffer.alloc(0));
          } else {
            metadataBuf = Buffer.alloc(0);
          }
          return {
            data: dataBuf,
            metadata: metadataBuf
          };
        })).map(function (payload) {
          return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  // Closes connections to a specific set of groups
  BrokerManagementServiceClient.prototype.closeGroup = function closeGroup(messages, metadata) {
    var once = false;
    const map = {};
    return this.closeGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeGroup', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestChannel(messages.map(function (message) {
          var dataBuf = Buffer.from(message.serializeBinary());
          if (!once) {
            once = true;
            var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeGroup', Buffer.alloc(0), metadata || Buffer.alloc(0));
          } else {
            metadataBuf = Buffer.alloc(0);
          }
          return {
            data: dataBuf,
            metadata: metadataBuf
          };
        })).map(function (payload) {
          return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  // Closes connections to a specific set of brokers
  BrokerManagementServiceClient.prototype.closeBroker = function closeBroker(messages, metadata) {
    var once = false;
    const map = {};
    return this.closeBrokerTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeBroker', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestChannel(messages.map(function (message) {
          var dataBuf = Buffer.from(message.serializeBinary());
          if (!once) {
            once = true;
            var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeBroker', Buffer.alloc(0), metadata || Buffer.alloc(0));
          } else {
            metadataBuf = Buffer.alloc(0);
          }
          return {
            data: dataBuf,
            metadata: metadataBuf
          };
        })).map(function (payload) {
          return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  // Closes all connections on the broker - except broker to broker connections
  BrokerManagementServiceClient.prototype.closeDestinations = function closeDestinations(message, metadata) {
    const map = {};
    return this.closeDestinationsTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeDestinations', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  // Closes connections to all other brokers
  BrokerManagementServiceClient.prototype.closeBrokers = function closeBrokers(message, metadata) {
    const map = {};
    return this.closeBrokersTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeBrokers', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  // Closes all connections on the broker including broker to broker connections
  BrokerManagementServiceClient.prototype.closeAll = function closeAll(message, metadata) {
    const map = {};
    return this.closeAllTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = proteus_tracing.mapToBuffer(map);
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeAll', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_broker_mgmt_pb.Ack.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  return BrokerManagementServiceClient;
}();

exports.BrokerManagementServiceClient = BrokerManagementServiceClient;

var BrokerManagementServiceServer = function () {
  function BrokerManagementServiceServer(service, tracer) {
    this._service = service;
    this._tracer = tracer;
    this.shutdownTrace = proteus_tracing.traceSingleAsChild(tracer, "BrokerManagementService.shutdown", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.leaveTrace = proteus_tracing.traceSingleAsChild(tracer, "BrokerManagementService.leave", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.rejoinTrace = proteus_tracing.traceSingleAsChild(tracer, "BrokerManagementService.rejoin", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.joinTrace = proteus_tracing.traceSingleAsChild(tracer, "BrokerManagementService.join", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeDestinationTrace = proteus_tracing.traceAsChild(tracer, "BrokerManagementService.closeDestination", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeGroupTrace = proteus_tracing.traceAsChild(tracer, "BrokerManagementService.closeGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeBrokerTrace = proteus_tracing.traceAsChild(tracer, "BrokerManagementService.closeBroker", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeDestinationsTrace = proteus_tracing.traceSingleAsChild(tracer, "BrokerManagementService.closeDestinations", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeBrokersTrace = proteus_tracing.traceSingleAsChild(tracer, "BrokerManagementService.closeBrokers", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeAllTrace = proteus_tracing.traceSingleAsChild(tracer, "BrokerManagementService.closeAll", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
  }
  BrokerManagementServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    if (payload.metadata == null) {
      throw new Error('metadata is empty');
    }
    var method = proteus_js_frames.getMethod(payload.metadata);
    var spanContext = proteus_tracing.deserializeTraceData(this._tracer, payload.metadata);
    switch (method) {
      case 'shutdown':
        this.shutdownTrace(spanContext)(new rsocket_flowable.Single(function (subscriber) {
          subscriber.onSubscribe();
          subscriber.onComplete();
          })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
        this._service.shutdown(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
        break;
      default:
        throw new Error('unknown method');
    }
  };
  BrokerManagementServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      var spanContext = proteus_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'leave':
          return this.leaveTrace(spanContext)(
            this._service
            .leave(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'rejoin':
          return this.rejoinTrace(spanContext)(
            this._service
            .rejoin(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'join':
          return this.joinTrace(spanContext)(
            this._service
            .join(proteus_broker_mgmt_pb.Brokers.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'closeDestinations':
          return this.closeDestinationsTrace(spanContext)(
            this._service
            .closeDestinations(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'closeBrokers':
          return this.closeBrokersTrace(spanContext)(
            this._service
            .closeBrokers(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
        case 'closeAll':
          return this.closeAllTrace(spanContext)(
            this._service
            .closeAll(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
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

