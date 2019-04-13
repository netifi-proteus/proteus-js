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
var proteus_broker_mgmt_pb = require('../proteus/broker_mgmt_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var proteus_broker_info_pb = require('../proteus/broker_info_pb.js');

var BrokerManagementServiceClient = function () {
  function BrokerManagementServiceClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.shutdownTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "shutdown"}, {"rsocket.rpc.role": "client"});
    this.shutdownMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "shutdown"}, {"role": "client"});
    this.shutdownGracefullyTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "shutdownGracefully"}, {"rsocket.rpc.role": "client"});
    this.shutdownGracefullyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "shutdownGracefully"}, {"role": "client"});
    this.leaveTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "leave"}, {"rsocket.rpc.role": "client"});
    this.leaveMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "leave"}, {"role": "client"});
    this.restartTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "restart"}, {"rsocket.rpc.role": "client"});
    this.restartMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "restart"}, {"role": "client"});
    this.rejoinTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "rejoin"}, {"rsocket.rpc.role": "client"});
    this.rejoinMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "rejoin"}, {"role": "client"});
    this.joinTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "join"}, {"rsocket.rpc.role": "client"});
    this.joinMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "join"}, {"role": "client"});
    this.closeDestinationTrace = rsocket_rpc_tracing.trace(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeDestination"}, {"rsocket.rpc.role": "client"});
    this.closeDestinationMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeDestination"}, {"role": "client"});
    this.closeGroupTrace = rsocket_rpc_tracing.trace(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeGroup"}, {"rsocket.rpc.role": "client"});
    this.closeGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeGroup"}, {"role": "client"});
    this.closeBrokerTrace = rsocket_rpc_tracing.trace(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeBroker"}, {"rsocket.rpc.role": "client"});
    this.closeBrokerMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeBroker"}, {"role": "client"});
    this.closeDestinationsTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeDestinations"}, {"rsocket.rpc.role": "client"});
    this.closeDestinationsMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeDestinations"}, {"role": "client"});
    this.closeBrokersTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeBrokers"}, {"rsocket.rpc.role": "client"});
    this.closeBrokersMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeBrokers"}, {"role": "client"});
    this.closeAllTrace = rsocket_rpc_tracing.traceSingle(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeAll"}, {"rsocket.rpc.role": "client"});
    this.closeAllMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeAll"}, {"role": "client"});
    this.closeConnectionTrace = rsocket_rpc_tracing.trace(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeConnection"}, {"rsocket.rpc.role": "client"});
    this.closeConnectionMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeConnection"}, {"role": "client"});
  }
  // Shutdowns down a broker process
  BrokerManagementServiceClient.prototype.shutdown = function shutdown(message, metadata) {
    const map = {};
    return this.shutdownMetrics(
      this.shutdownTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'shutdown', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return google_protobuf_empty_pb.Empty.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Shutdowns down a broker process after draining connections with timeout
  BrokerManagementServiceClient.prototype.shutdownGracefully = function shutdownGracefully(message, metadata) {
    const map = {};
    return this.shutdownGracefullyMetrics(
      this.shutdownGracefullyTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'shutdownGracefully', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return google_protobuf_empty_pb.Empty.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Broker leaves the cluster, but stays running
  BrokerManagementServiceClient.prototype.leave = function leave(message, metadata) {
    const map = {};
    return this.leaveMetrics(
      this.leaveTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'leave', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Broker drains connections and leaves the cluster, then joins cluster again
  BrokerManagementServiceClient.prototype.restart = function restart(message, metadata) {
    const map = {};
    return this.restartMetrics(
      this.restartTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'restart', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Broker joins cluster It previously left
  BrokerManagementServiceClient.prototype.rejoin = function rejoin(message, metadata) {
    const map = {};
    return this.rejoinMetrics(
      this.rejoinTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'rejoin', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Tells the Broker to join using the provided Brokers
  BrokerManagementServiceClient.prototype.join = function join(message, metadata) {
    const map = {};
    return this.joinMetrics(
      this.joinTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'join', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Closes connections to a specific set of destinations
  BrokerManagementServiceClient.prototype.closeDestination = function closeDestination(messages, metadata) {
    const map = {};
    return this.closeDestinationMetrics(
      this.closeDestinationTrace(map)(new rsocket_flowable.Flowable(subscriber => {
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
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Closes connections to a specific set of groups
  BrokerManagementServiceClient.prototype.closeGroup = function closeGroup(messages, metadata) {
    const map = {};
    return this.closeGroupMetrics(
      this.closeGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
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
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Closes connections to a specific set of brokers
  BrokerManagementServiceClient.prototype.closeBroker = function closeBroker(messages, metadata) {
    const map = {};
    return this.closeBrokerMetrics(
      this.closeBrokerTrace(map)(new rsocket_flowable.Flowable(subscriber => {
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
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Closes all connections on the broker - except broker to broker connections
  BrokerManagementServiceClient.prototype.closeDestinations = function closeDestinations(message, metadata) {
    const map = {};
    return this.closeDestinationsMetrics(
      this.closeDestinationsTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeDestinations', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Closes connections to all other brokers
  BrokerManagementServiceClient.prototype.closeBrokers = function closeBrokers(message, metadata) {
    const map = {};
    return this.closeBrokersMetrics(
      this.closeBrokersTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeBrokers', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Closes all connections on the broker including broker to broker connections
  BrokerManagementServiceClient.prototype.closeAll = function closeAll(message, metadata) {
    const map = {};
    return this.closeAllMetrics(
      this.closeAllTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeAll', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Closes connection on the broker by its id. Connection group is optional
  BrokerManagementServiceClient.prototype.closeConnection = function closeConnection(messages, metadata) {
    const map = {};
    return this.closeConnectionMetrics(
      this.closeConnectionTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf;
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf ;
          this._rs.requestChannel(messages.map(function (message) {
            dataBuf = Buffer.from(message.serializeBinary());
            metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.BrokerManagementService', 'closeConnection', tracingMetadata, metadata || Buffer.alloc(0));
            return {
              data: dataBuf,
              metadata: metadataBuf
            };
          })).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Ack.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return BrokerManagementServiceClient;
}();

exports.BrokerManagementServiceClient = BrokerManagementServiceClient;

var BrokerManagementServiceServer = function () {
  function BrokerManagementServiceServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.shutdownTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "shutdown"}, {"rsocket.rpc.role": "server"});
    this.shutdownMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "shutdown"}, {"role": "server"});
    this.shutdownGracefullyTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "shutdownGracefully"}, {"rsocket.rpc.role": "server"});
    this.shutdownGracefullyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "shutdownGracefully"}, {"role": "server"});
    this.leaveTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "leave"}, {"rsocket.rpc.role": "server"});
    this.leaveMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "leave"}, {"role": "server"});
    this.restartTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "restart"}, {"rsocket.rpc.role": "server"});
    this.restartMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "restart"}, {"role": "server"});
    this.rejoinTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "rejoin"}, {"rsocket.rpc.role": "server"});
    this.rejoinMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "rejoin"}, {"role": "server"});
    this.joinTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "join"}, {"rsocket.rpc.role": "server"});
    this.joinMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "join"}, {"role": "server"});
    this.closeDestinationTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeDestination"}, {"rsocket.rpc.role": "server"});
    this.closeDestinationMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeDestination"}, {"role": "server"});
    this.closeGroupTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeGroup"}, {"rsocket.rpc.role": "server"});
    this.closeGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeGroup"}, {"role": "server"});
    this.closeBrokerTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeBroker"}, {"rsocket.rpc.role": "server"});
    this.closeBrokerMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeBroker"}, {"role": "server"});
    this.closeDestinationsTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeDestinations"}, {"rsocket.rpc.role": "server"});
    this.closeDestinationsMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeDestinations"}, {"role": "server"});
    this.closeBrokersTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeBrokers"}, {"rsocket.rpc.role": "server"});
    this.closeBrokersMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeBrokers"}, {"role": "server"});
    this.closeAllTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeAll"}, {"rsocket.rpc.role": "server"});
    this.closeAllMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeAll"}, {"role": "server"});
    this.closeConnectionTrace = rsocket_rpc_tracing.traceAsChild(tracer, "BrokerManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeConnection"}, {"rsocket.rpc.role": "server"});
    this.closeConnectionMetrics = rsocket_rpc_metrics.timed(meterRegistry, "BrokerManagementService", {"service": "io.netifi.proteus.broker.info.BrokerManagementService"}, {"method": "closeConnection"}, {"role": "server"});
    this._channelSwitch = (payload, restOfMessages) => {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      let deserializedMessages;
      switch(method){
        case 'closeDestination':
          deserializedMessages = restOfMessages.map(payload => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Destination.deserializeBinary(binary);
          });
          return this.closeDestinationMetrics(
            this.closeDestinationTrace(spanContext)(
              this._service
                .closeDestination(deserializedMessages, payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                })
              )
            );
        case 'closeGroup':
          deserializedMessages = restOfMessages.map(payload => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Group.deserializeBinary(binary);
          });
          return this.closeGroupMetrics(
            this.closeGroupTrace(spanContext)(
              this._service
                .closeGroup(deserializedMessages, payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                })
              )
            );
        case 'closeBroker':
          deserializedMessages = restOfMessages.map(payload => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_info_pb.Broker.deserializeBinary(binary);
          });
          return this.closeBrokerMetrics(
            this.closeBrokerTrace(spanContext)(
              this._service
                .closeBroker(deserializedMessages, payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                })
              )
            );
        case 'closeConnection':
          deserializedMessages = restOfMessages.map(payload => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_broker_mgmt_pb.Connection.deserializeBinary(binary);
          });
          return this.closeConnectionMetrics(
            this.closeConnectionTrace(spanContext)(
              this._service
                .closeConnection(deserializedMessages, payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                })
              )
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
          return this.shutdownMetrics(
            this.shutdownTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .shutdown(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
        case 'shutdownGracefully':
          return this.shutdownGracefullyMetrics(
            this.shutdownGracefullyTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .shutdownGracefully(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
        case 'leave':
          return this.leaveMetrics(
            this.leaveTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .leave(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
        case 'restart':
          return this.restartMetrics(
            this.restartTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .restart(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
        case 'rejoin':
          return this.rejoinMetrics(
            this.rejoinTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .rejoin(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
        case 'join':
          return this.joinMetrics(
            this.joinTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .join(proteus_broker_mgmt_pb.Brokers.deserializeBinary(binary), payload.metadata)
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
        case 'closeDestinations':
          return this.closeDestinationsMetrics(
            this.closeDestinationsTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .closeDestinations(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
        case 'closeBrokers':
          return this.closeBrokersMetrics(
            this.closeBrokersTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .closeBrokers(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
        case 'closeAll':
          return this.closeAllMetrics(
            this.closeAllTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .closeAll(google_protobuf_empty_pb.Empty.deserializeBinary(binary), payload.metadata)
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
  BrokerManagementServiceServer.prototype.requestStream = function requestStream(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestStream() is not implemented'));
  };
  BrokerManagementServiceServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  BrokerManagementServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return BrokerManagementServiceServer;
}();

exports.BrokerManagementServiceServer = BrokerManagementServiceServer;

