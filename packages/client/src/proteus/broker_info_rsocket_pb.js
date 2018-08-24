// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_flowable = require('rsocket-flowable');
var proteus_broker_info_pb = require('../proteus/broker_info_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

var BrokerInfoServiceClient = function () {
  function BrokerInfoServiceClient(rs, tracer) {
    this._rs = rs;
    this._tracer = tracer;
    this.brokersTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService.brokers", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
    this.groupsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService.groups", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
    this.destinationsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService.destinations", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
    this.destinationsByBrokerAndGroupTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService.destinationsByBrokerAndGroup", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
    this.destinationsByGroupTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService.destinationsByGroup", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
    this.brokersWithGroupTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService.brokersWithGroup", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
    this.brokerWithDestinationTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerInfoService.brokerWithDestination", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
    this.streamGroupEventsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService.streamGroupEvents", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
    this.streamDestinationEventsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService.streamDestinationEvents", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
    this.streamBrokerEventsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService.streamBrokerEvents", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "client"});
  }
  BrokerInfoServiceClient.prototype.brokers = function brokers(message, metadata) {
    const map = {};
    return this.brokersTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Brokers', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Broker.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  BrokerInfoServiceClient.prototype.groups = function groups(message, metadata) {
    const map = {};
    return this.groupsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Groups', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Group.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  BrokerInfoServiceClient.prototype.destinations = function destinations(message, metadata) {
    const map = {};
    return this.destinationsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Destinations', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Destination.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  BrokerInfoServiceClient.prototype.destinationsByBrokerAndGroup = function destinationsByBrokerAndGroup(message, metadata) {
    const map = {};
    return this.destinationsByBrokerAndGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'DestinationsByBrokerAndGroup', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Destination.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  BrokerInfoServiceClient.prototype.destinationsByGroup = function destinationsByGroup(message, metadata) {
    const map = {};
    return this.destinationsByGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'DestinationsByGroup', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Destination.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  BrokerInfoServiceClient.prototype.brokersWithGroup = function brokersWithGroup(message, metadata) {
    const map = {};
    return this.brokersWithGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'BrokersWithGroup', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Broker.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  BrokerInfoServiceClient.prototype.brokerWithDestination = function brokerWithDestination(message, metadata) {
    const map = {};
    return this.brokerWithDestinationTrace(map)(new rsocket_flowable.Single(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'BrokerWithDestination', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestResponse({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Broker.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  BrokerInfoServiceClient.prototype.streamGroupEvents = function streamGroupEvents(message, metadata) {
    const map = {};
    return this.streamGroupEventsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamGroupEvents', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Event.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  BrokerInfoServiceClient.prototype.streamDestinationEvents = function streamDestinationEvents(message, metadata) {
    const map = {};
    return this.streamDestinationEventsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamDestinationEvents', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Event.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  BrokerInfoServiceClient.prototype.streamBrokerEvents = function streamBrokerEvents(message, metadata) {
    const map = {};
    return this.streamBrokerEventsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
      var dataBuf = Buffer.from(message.serializeBinary());
      var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
      var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamBrokerEvents', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
          var binary = payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
          return proteus_broker_info_pb.Event.deserializeBinary(binary);
        }).subscribe(subscriber);
      })
    );
  };
  return BrokerInfoServiceClient;
}();

exports.BrokerInfoServiceClient = BrokerInfoServiceClient;

var BrokerInfoServiceServer = function () {
  function BrokerInfoServiceServer(service, tracer) {
    this._service = service;
    this._tracer = tracer;
    this.brokersTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService.brokers", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
    this.groupsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService.groups", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
    this.destinationsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService.destinations", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
    this.destinationsByBrokerAndGroupTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService.destinationsByBrokerAndGroup", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
    this.destinationsByGroupTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService.destinationsByGroup", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
    this.brokersWithGroupTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService.brokersWithGroup", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
    this.brokerWithDestinationTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerInfoService.brokerWithDestination", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
    this.streamGroupEventsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService.streamGroupEvents", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
    this.streamDestinationEventsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService.streamDestinationEvents", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
    this.streamBrokerEventsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService.streamBrokerEvents", {"rsocket.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"rsocket.rpc.role": "server"});
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
  BrokerInfoServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  BrokerInfoServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'BrokerWithDestination':
          return this.brokerWithDestinationTrace(spanContext)(
            this._service
            .brokerWithDestination(proteus_broker_info_pb.Destination.deserializeBinary(payload.data), payload.metadata)
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
  BrokerInfoServiceServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'Brokers':
          return this.brokersTrace(spanContext)(
            this._service
              .brokers(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'Groups':
          return this.groupsTrace(spanContext)(
            this._service
              .groups(proteus_broker_info_pb.Broker.deserializeBinary(payload.data), payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'Destinations':
          return this.destinationsTrace(spanContext)(
            this._service
              .destinations(proteus_broker_info_pb.Broker.deserializeBinary(payload.data), payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'DestinationsByBrokerAndGroup':
          return this.destinationsByBrokerAndGroupTrace(spanContext)(
            this._service
              .destinationsByBrokerAndGroup(proteus_broker_info_pb.Group.deserializeBinary(payload.data), payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'DestinationsByGroup':
          return this.destinationsByGroupTrace(spanContext)(
            this._service
              .destinationsByGroup(proteus_broker_info_pb.Group.deserializeBinary(payload.data), payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'BrokersWithGroup':
          return this.brokersWithGroupTrace(spanContext)(
            this._service
              .brokersWithGroup(proteus_broker_info_pb.Group.deserializeBinary(payload.data), payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'streamGroupEvents':
          return this.streamGroupEventsTrace(spanContext)(
            this._service
              .streamGroupEvents(proteus_broker_info_pb.Group.deserializeBinary(payload.data), payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'streamDestinationEvents':
          return this.streamDestinationEventsTrace(spanContext)(
            this._service
              .streamDestinationEvents(proteus_broker_info_pb.Destination.deserializeBinary(payload.data), payload.metadata)
              .map(function (message) {
                return {
                  data: Buffer.from(message.serializeBinary()),
                  metadata: Buffer.alloc(0)
                }
              })
            );
        case 'streamBrokerEvents':
          return this.streamBrokerEventsTrace(spanContext)(
            this._service
              .streamBrokerEvents(google_protobuf_empty_pb.Empty.deserializeBinary(payload.data), payload.metadata)
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
  BrokerInfoServiceServer.prototype.requestChannel = function requestChannel(payloads) {
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
    BrokerInfoServiceServer.prototype.metadataPush = function metadataPush(payload) {
      return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
    };
    return BrokerInfoServiceServer;
  }();

  exports.BrokerInfoServiceServer = BrokerInfoServiceServer;

