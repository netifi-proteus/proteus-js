// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var proteus_tracing = require('proteus-js-tracing');
var rsocket_flowable = require('rsocket-flowable');
var proteus_broker_info_pb = require('../proteus/broker_info_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

var BrokerInfoServiceClient = function () {
  function BrokerInfoServiceClient(rs, tracer) {
    this._rs = rs;
    this._tracer = tracer;
    this.brokersTrace = proteus_tracing.trace(tracer, "BrokerInfoService.brokers", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
    this.groupsTrace = proteus_tracing.trace(tracer, "BrokerInfoService.groups", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
    this.destinationsTrace = proteus_tracing.trace(tracer, "BrokerInfoService.destinations", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
    this.destinationsByBrokerAndGroupTrace = proteus_tracing.trace(tracer, "BrokerInfoService.destinationsByBrokerAndGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
    this.destinationsByGroupTrace = proteus_tracing.trace(tracer, "BrokerInfoService.destinationsByGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
    this.brokersWithGroupTrace = proteus_tracing.trace(tracer, "BrokerInfoService.brokersWithGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
    this.brokerWithDestinationTrace = proteus_tracing.traceSingle(tracer, "BrokerInfoService.brokerWithDestination", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
    this.streamGroupEventsTrace = proteus_tracing.trace(tracer, "BrokerInfoService.streamGroupEvents", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
    this.streamDestinationEventsTrace = proteus_tracing.trace(tracer, "BrokerInfoService.streamDestinationEvents", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
    this.streamBrokerEventsTrace = proteus_tracing.trace(tracer, "BrokerInfoService.streamBrokerEvents", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "client"});
  }
  BrokerInfoServiceClient.prototype.brokers = function brokers(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Brokers', Buffer.alloc(0), metadata || Buffer.alloc(0));
    const map = {};
    return this.brokersTrace(map)(
      this._rs.requestStream({
        data: dataBuf,
        metadata: metadataBuf
      }).map(function (payload) {
        return proteus_broker_info_pb.Broker.deserializeBinary(payload.data);
      })
      );
    };
    BrokerInfoServiceClient.prototype.groups = function groups(message, metadata) {
      var dataBuf = Buffer.from(message.serializeBinary());
      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Groups', Buffer.alloc(0), metadata || Buffer.alloc(0));
      const map = {};
      return this.groupsTrace(map)(
        this._rs.requestStream({
          data: dataBuf,
          metadata: metadataBuf
        }).map(function (payload) {
          return proteus_broker_info_pb.Group.deserializeBinary(payload.data);
        })
        );
      };
      BrokerInfoServiceClient.prototype.destinations = function destinations(message, metadata) {
        var dataBuf = Buffer.from(message.serializeBinary());
        var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Destinations', Buffer.alloc(0), metadata || Buffer.alloc(0));
        const map = {};
        return this.destinationsTrace(map)(
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            return proteus_broker_info_pb.Destination.deserializeBinary(payload.data);
          })
          );
        };
        BrokerInfoServiceClient.prototype.destinationsByBrokerAndGroup = function destinationsByBrokerAndGroup(message, metadata) {
          var dataBuf = Buffer.from(message.serializeBinary());
          var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'DestinationsByBrokerAndGroup', Buffer.alloc(0), metadata || Buffer.alloc(0));
          const map = {};
          return this.destinationsByBrokerAndGroupTrace(map)(
            this._rs.requestStream({
              data: dataBuf,
              metadata: metadataBuf
            }).map(function (payload) {
              return proteus_broker_info_pb.Destination.deserializeBinary(payload.data);
            })
            );
          };
          BrokerInfoServiceClient.prototype.destinationsByGroup = function destinationsByGroup(message, metadata) {
            var dataBuf = Buffer.from(message.serializeBinary());
            var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'DestinationsByGroup', Buffer.alloc(0), metadata || Buffer.alloc(0));
            const map = {};
            return this.destinationsByGroupTrace(map)(
              this._rs.requestStream({
                data: dataBuf,
                metadata: metadataBuf
              }).map(function (payload) {
                return proteus_broker_info_pb.Destination.deserializeBinary(payload.data);
              })
              );
            };
            BrokerInfoServiceClient.prototype.brokersWithGroup = function brokersWithGroup(message, metadata) {
              var dataBuf = Buffer.from(message.serializeBinary());
              var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'BrokersWithGroup', Buffer.alloc(0), metadata || Buffer.alloc(0));
              const map = {};
              return this.brokersWithGroupTrace(map)(
                this._rs.requestStream({
                  data: dataBuf,
                  metadata: metadataBuf
                }).map(function (payload) {
                  return proteus_broker_info_pb.Broker.deserializeBinary(payload.data);
                })
                );
              };
              BrokerInfoServiceClient.prototype.brokerWithDestination = function brokerWithDestination(message, metadata) {
                var dataBuf = Buffer.from(message.serializeBinary());
                var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'BrokerWithDestination', Buffer.alloc(0), metadata || Buffer.alloc(0));
                const map = {};
                return this.brokerWithDestinationTrace(map)(
                  this._rs.requestResponse({
                    data: dataBuf,
                    metadata: metadataBuf
                  }).map(function (payload) {
                    return proteus_broker_info_pb.Broker.deserializeBinary(payload.data);
                  })
                  );
                };
                BrokerInfoServiceClient.prototype.streamGroupEvents = function streamGroupEvents(message, metadata) {
                  var dataBuf = Buffer.from(message.serializeBinary());
                  var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamGroupEvents', Buffer.alloc(0), metadata || Buffer.alloc(0));
                  const map = {};
                  return this.streamGroupEventsTrace(map)(
                    this._rs.requestStream({
                      data: dataBuf,
                      metadata: metadataBuf
                    }).map(function (payload) {
                      return proteus_broker_info_pb.Event.deserializeBinary(payload.data);
                    })
                    );
                  };
                  BrokerInfoServiceClient.prototype.streamDestinationEvents = function streamDestinationEvents(message, metadata) {
                    var dataBuf = Buffer.from(message.serializeBinary());
                    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamDestinationEvents', Buffer.alloc(0), metadata || Buffer.alloc(0));
                    const map = {};
                    return this.streamDestinationEventsTrace(map)(
                      this._rs.requestStream({
                        data: dataBuf,
                        metadata: metadataBuf
                      }).map(function (payload) {
                        return proteus_broker_info_pb.Event.deserializeBinary(payload.data);
                      })
                      );
                    };
                    BrokerInfoServiceClient.prototype.streamBrokerEvents = function streamBrokerEvents(message, metadata) {
                      var dataBuf = Buffer.from(message.serializeBinary());
                      var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamBrokerEvents', Buffer.alloc(0), metadata || Buffer.alloc(0));
                      const map = {};
                      return this.streamBrokerEventsTrace(map)(
                        this._rs.requestStream({
                          data: dataBuf,
                          metadata: metadataBuf
                        }).map(function (payload) {
                          return proteus_broker_info_pb.Event.deserializeBinary(payload.data);
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
                        this.brokersTrace = proteus_tracing.traceAsChild(tracer, "BrokerInfoService.brokers", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
                        this.groupsTrace = proteus_tracing.traceAsChild(tracer, "BrokerInfoService.groups", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
                        this.destinationsTrace = proteus_tracing.traceAsChild(tracer, "BrokerInfoService.destinations", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
                        this.destinationsByBrokerAndGroupTrace = proteus_tracing.traceAsChild(tracer, "BrokerInfoService.destinationsByBrokerAndGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
                        this.destinationsByGroupTrace = proteus_tracing.traceAsChild(tracer, "BrokerInfoService.destinationsByGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
                        this.brokersWithGroupTrace = proteus_tracing.traceAsChild(tracer, "BrokerInfoService.brokersWithGroup", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
                        this.brokerWithDestinationTrace = proteus_tracing.traceSingleAsChild(tracer, "BrokerInfoService.brokerWithDestination", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
                        this.streamGroupEventsTrace = proteus_tracing.traceAsChild(tracer, "BrokerInfoService.streamGroupEvents", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
                        this.streamDestinationEventsTrace = proteus_tracing.traceAsChild(tracer, "BrokerInfoService.streamDestinationEvents", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
                        this.streamBrokerEventsTrace = proteus_tracing.traceAsChild(tracer, "BrokerInfoService.streamBrokerEvents", {"proteus.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"proteus.type": "server"});
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
                          var spanContext = proteus_tracing.deserializeTraceData(this._tracer, payload.metadata);
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
                        var method = proteus_js_frames.getMethod(payload.metadata);
                        var spanContext = proteus_tracing.deserializeTraceData(this._tracer, payload.metadata);
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
                    BrokerInfoServiceServer.prototype.requestChannel = function requestChannel(payload) {
                      return rsocket_flowable.Flowable.error(new Error('requestChannel() is not implemented'));
                    };
                    BrokerInfoServiceServer.prototype.metadataPush = function metadataPush(payload) {
                      return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
                    };
                    return BrokerInfoServiceServer;
                  }();

                  exports.BrokerInfoServiceServer = BrokerInfoServiceServer;

