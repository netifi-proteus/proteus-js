// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_flowable = require('rsocket-flowable');
var proteus_broker_mgmt_pb = require('../proteus/broker_mgmt_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var proteus_broker_info_pb = require('../proteus/broker_info_pb.js');

var BrokerManagementServiceClient = function () {
  function BrokerManagementServiceClient(rs, tracer) {
    this._rs = rs;
    this._tracer = tracer;
    this.shutdownTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService.shutdown", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.leaveTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService.leave", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.rejoinTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService.rejoin", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.joinTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService.join", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeDestinationTrace = rsocket_rpc_tracing.trace(tracer, "BrokerManagementService.closeDestination", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeGroupTrace = rsocket_rpc_tracing.trace(tracer, "BrokerManagementService.closeGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeBrokerTrace = rsocket_rpc_tracing.trace(tracer, "BrokerManagementService.closeBroker", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeDestinationsTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService.closeDestinations", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeBrokersTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService.closeBrokers", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
    this.closeAllTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService.closeAll", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "client"});
  }
  // Shutdowns down a broker process
  BrokerManagementServiceClient.prototype.shutdown = function shutdown(message, metadata) {
    const map = {};
    return this.shutdownTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'shutdown', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return google_protobuf_empty_pb.Empty.deserializeBinary(payload.data);
        }).subscribe(subscriber);
      })
    );
  };
  // Broker leaves the cluster, but stays running
  BrokerManagementServiceClient.prototype.leave = function leave(message, metadata) {
    const map = {};
    return this.leaveTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'leave', tracingMetadata, metadata || Buffer.alloc(0));
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
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'rejoin', tracingMetadata, metadata || Buffer.alloc(0));
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
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'join', tracingMetadata, metadata || Buffer.alloc(0));
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
    const map = {};
    return this.closeDestinationTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf;
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf ;
        this._rs.requestChannel(messages.map(function (message) {
          dataBuf = Buffer.from(message.serializeBinary());
          metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeDestination', tracingMetadata, metadata || Buffer.alloc(0));
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
    const map = {};
    return this.closeGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf;
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf ;
        this._rs.requestChannel(messages.map(function (message) {
          dataBuf = Buffer.from(message.serializeBinary());
          metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeGroup', tracingMetadata, metadata || Buffer.alloc(0));
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
    const map = {};
    return this.closeBrokerTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf;
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf ;
        this._rs.requestChannel(messages.map(function (message) {
          dataBuf = Buffer.from(message.serializeBinary());
          metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeBroker', tracingMetadata, metadata || Buffer.alloc(0));
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
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeDestinations', tracingMetadata, metadata || Buffer.alloc(0));
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
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeBrokers', tracingMetadata, metadata || Buffer.alloc(0));
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
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeAll', tracingMetadata, metadata || Buffer.alloc(0));
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
    this.shutdownTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService.shutdown", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.leaveTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService.leave", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.rejoinTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService.rejoin", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.joinTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService.join", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeDestinationTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerManagementService.closeDestination", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeGroupTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerManagementService.closeGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeBrokerTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerManagementService.closeBroker", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeDestinationsTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService.closeDestinations", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeBrokersTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService.closeBrokers", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this.closeAllTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService.closeAll", {"proteus.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"proteus.type": "server"});
    this._channelSwitch = (payload, restOfMessages) => {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      let deserializedMessages;
      switch(method){
        case 'closeDestination':
          deserializedMessages = restOfMessages.map(message => proteus_broker_info_pb.Destination.deserializeBinary(message));
          return this.closeDestinationTrace(spanContext)(
            this._service
              .closeDestination(deserializedMessages, payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'closeGroup':
          deserializedMessages = restOfMessages.map(message => proteus_broker_info_pb.Group.deserializeBinary(message));
          return this.closeGroupTrace(spanContext)(
            this._service
              .closeGroup(deserializedMessages, payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'closeBroker':
          deserializedMessages = restOfMessages.map(message => proteus_broker_info_pb.Broker.deserializeBinary(message));
          return this.closeBrokerTrace(spanContext)(
            this._service
              .closeBroker(deserializedMessages, payload.metadata)
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
    };
  }
  BrokerManagementServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  BrokerManagementServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'shutdown':
          return this.shutdownTrace(spanContext)(
            this._service
            .shutdown(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
            .map(function (message) {
              return {
                data: Buffer.from(message.serializeBinary()),
                metadata: Buffer.alloc(0)
              }
            })
          );
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
  BrokerManagementServiceServer.prototype.requestChannel = function requestChannel(payloads) {
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
    BrokerManagementServiceServer.prototype.metadataPush = function metadataPush(payload) {
      return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
    };
    return BrokerManagementServiceServer;
  }();

  exports.BrokerManagementServiceServer = BrokerManagementServiceServer;

