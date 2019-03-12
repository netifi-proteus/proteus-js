// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
//
//    Copyright 2019 The Proteus Authors
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var proteus_broker_info_pb = require('../proteus/broker_info_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

var BrokerInfoServiceClient = function () {
  function BrokerInfoServiceClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.brokersTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokers"}, {"rsocket.rpc.role": "client"});
    this.brokersMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokers"}, {"role": "client"});
    this.groupsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "groups"}, {"rsocket.rpc.role": "client"});
    this.groupsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "groups"}, {"role": "client"});
    this.destinationsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinations"}, {"rsocket.rpc.role": "client"});
    this.destinationsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinations"}, {"role": "client"});
    this.destinationsByBrokerAndGroupTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinationsByBrokerAndGroup"}, {"rsocket.rpc.role": "client"});
    this.destinationsByBrokerAndGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinationsByBrokerAndGroup"}, {"role": "client"});
    this.destinationsByGroupTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinationsByGroup"}, {"rsocket.rpc.role": "client"});
    this.destinationsByGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinationsByGroup"}, {"role": "client"});
    this.brokersWithGroupTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokersWithGroup"}, {"rsocket.rpc.role": "client"});
    this.brokersWithGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokersWithGroup"}, {"role": "client"});
    this.brokerWithDestinationTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokerWithDestination"}, {"rsocket.rpc.role": "client"});
    this.brokerWithDestinationMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokerWithDestination"}, {"role": "client"});
    this.streamGroupEventsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamGroupEvents"}, {"rsocket.rpc.role": "client"});
    this.streamGroupEventsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamGroupEvents"}, {"role": "client"});
    this.streamDestinationEventsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamDestinationEvents"}, {"rsocket.rpc.role": "client"});
    this.streamDestinationEventsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamDestinationEvents"}, {"role": "client"});
    this.streamBrokerEventsTrace = rsocket_rpc_tracing.trace(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamBrokerEvents"}, {"rsocket.rpc.role": "client"});
    this.streamBrokerEventsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamBrokerEvents"}, {"role": "client"});
  }
  BrokerInfoServiceClient.prototype.brokers = function brokers(message, metadata) {
    const map = {};
    return this.brokersMetrics(
      this.brokersTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Brokers', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Broker.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  BrokerInfoServiceClient.prototype.groups = function groups(message, metadata) {
    const map = {};
    return this.groupsMetrics(
      this.groupsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Groups', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Group.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  BrokerInfoServiceClient.prototype.destinations = function destinations(message, metadata) {
    const map = {};
    return this.destinationsMetrics(
      this.destinationsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'Destinations', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Destination.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  BrokerInfoServiceClient.prototype.destinationsByBrokerAndGroup = function destinationsByBrokerAndGroup(message, metadata) {
    const map = {};
    return this.destinationsByBrokerAndGroupMetrics(
      this.destinationsByBrokerAndGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'DestinationsByBrokerAndGroup', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Destination.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  BrokerInfoServiceClient.prototype.destinationsByGroup = function destinationsByGroup(message, metadata) {
    const map = {};
    return this.destinationsByGroupMetrics(
      this.destinationsByGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'DestinationsByGroup', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Destination.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  BrokerInfoServiceClient.prototype.brokersWithGroup = function brokersWithGroup(message, metadata) {
    const map = {};
    return this.brokersWithGroupMetrics(
      this.brokersWithGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'BrokersWithGroup', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Broker.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  BrokerInfoServiceClient.prototype.brokerWithDestination = function brokerWithDestination(message, metadata) {
    const map = {};
    return this.brokerWithDestinationMetrics(
      this.brokerWithDestinationTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'BrokerWithDestination', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Broker.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  BrokerInfoServiceClient.prototype.streamGroupEvents = function streamGroupEvents(message, metadata) {
    const map = {};
    return this.streamGroupEventsMetrics(
      this.streamGroupEventsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamGroupEvents', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Event.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  BrokerInfoServiceClient.prototype.streamDestinationEvents = function streamDestinationEvents(message, metadata) {
    const map = {};
    return this.streamDestinationEventsMetrics(
      this.streamDestinationEventsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamDestinationEvents', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Event.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  BrokerInfoServiceClient.prototype.streamBrokerEvents = function streamBrokerEvents(message, metadata) {
    const map = {};
    return this.streamBrokerEventsMetrics(
      this.streamBrokerEventsTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerInfoService', 'streamBrokerEvents', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Event.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return BrokerInfoServiceClient;
}();

exports.BrokerInfoServiceClient = BrokerInfoServiceClient;

var BrokerInfoServiceServer = function () {
  function BrokerInfoServiceServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.brokersTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokers"}, {"rsocket.rpc.role": "server"});
    this.brokersMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokers"}, {"role": "server"});
    this.groupsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "groups"}, {"rsocket.rpc.role": "server"});
    this.groupsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "groups"}, {"role": "server"});
    this.destinationsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinations"}, {"rsocket.rpc.role": "server"});
    this.destinationsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinations"}, {"role": "server"});
    this.destinationsByBrokerAndGroupTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinationsByBrokerAndGroup"}, {"rsocket.rpc.role": "server"});
    this.destinationsByBrokerAndGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinationsByBrokerAndGroup"}, {"role": "server"});
    this.destinationsByGroupTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinationsByGroup"}, {"rsocket.rpc.role": "server"});
    this.destinationsByGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "destinationsByGroup"}, {"role": "server"});
    this.brokersWithGroupTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokersWithGroup"}, {"rsocket.rpc.role": "server"});
    this.brokersWithGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokersWithGroup"}, {"role": "server"});
    this.brokerWithDestinationTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokerWithDestination"}, {"rsocket.rpc.role": "server"});
    this.brokerWithDestinationMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "brokerWithDestination"}, {"role": "server"});
    this.streamGroupEventsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamGroupEvents"}, {"rsocket.rpc.role": "server"});
    this.streamGroupEventsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamGroupEvents"}, {"role": "server"});
    this.streamDestinationEventsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamDestinationEvents"}, {"rsocket.rpc.role": "server"});
    this.streamDestinationEventsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamDestinationEvents"}, {"role": "server"});
    this.streamBrokerEventsTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerInfoService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamBrokerEvents"}, {"rsocket.rpc.role": "server"});
    this.streamBrokerEventsMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerInfoService", {"service": "io.netifi.proteus.broker.info.BrokerInfoService"}, {"method": "streamBrokerEvents"}, {"role": "server"});
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
          return this.brokerWithDestinationMetrics(
            this.brokerWithDestinationTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .brokerWithDestination(proteus_broker_info_pb.Destination.deserializeBinary(binary), payload.metadata)
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
  BrokerInfoServiceServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'Brokers':
          return this.brokersMetrics(
            this.brokersTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .brokers(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
        case 'Groups':
          return this.groupsMetrics(
            this.groupsTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .groups(proteus_broker_info_pb.Broker.deserializeBinary(binary), payload.metadata)
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
        case 'Destinations':
          return this.destinationsMetrics(
            this.destinationsTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .destinations(proteus_broker_info_pb.Broker.deserializeBinary(binary), payload.metadata)
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
        case 'DestinationsByBrokerAndGroup':
          return this.destinationsByBrokerAndGroupMetrics(
            this.destinationsByBrokerAndGroupTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .destinationsByBrokerAndGroup(proteus_broker_info_pb.Group.deserializeBinary(binary), payload.metadata)
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
        case 'DestinationsByGroup':
          return this.destinationsByGroupMetrics(
            this.destinationsByGroupTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .destinationsByGroup(proteus_broker_info_pb.Group.deserializeBinary(binary), payload.metadata)
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
        case 'BrokersWithGroup':
          return this.brokersWithGroupMetrics(
            this.brokersWithGroupTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .brokersWithGroup(proteus_broker_info_pb.Group.deserializeBinary(binary), payload.metadata)
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
        case 'streamGroupEvents':
          return this.streamGroupEventsMetrics(
            this.streamGroupEventsTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .streamGroupEvents(proteus_broker_info_pb.Group.deserializeBinary(binary), payload.metadata)
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
        case 'streamDestinationEvents':
          return this.streamDestinationEventsMetrics(
            this.streamDestinationEventsTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .streamDestinationEvents(proteus_broker_info_pb.Destination.deserializeBinary(binary), payload.metadata)
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
        case 'streamBrokerEvents':
          return this.streamBrokerEventsMetrics(
            this.streamBrokerEventsTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .streamBrokerEvents(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
  BrokerInfoServiceServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  BrokerInfoServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return BrokerInfoServiceServer;
}();

exports.BrokerInfoServiceServer = BrokerInfoServiceServer;

