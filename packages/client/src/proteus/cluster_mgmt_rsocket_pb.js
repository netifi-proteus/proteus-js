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
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var proteus_broker_mgmt_pb = require('../proteus/broker_mgmt_pb.js');
var proteus_broker_info_pb = require('../proteus/broker_info_pb.js');

var ClusterManagementServiceClient = function () {
  function ClusterManagementServiceClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.closeDestinationTrace = rsocket_rpc_tracing.trace(tracer, "ClusterManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.ClusterManagementService"}, {"method": "closeDestination"}, {"rsocket.rpc.role": "client"});
    this.closeDestinationMetrics = rsocket_rpc_metrics.timed(meterRegistry, "ClusterManagementService", {"service": "io.netifi.proteus.broker.info.ClusterManagementService"}, {"method": "closeDestination"}, {"role": "client"});
    this.closeGroupTrace = rsocket_rpc_tracing.trace(tracer, "ClusterManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.ClusterManagementService"}, {"method": "closeGroup"}, {"rsocket.rpc.role": "client"});
    this.closeGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "ClusterManagementService", {"service": "io.netifi.proteus.broker.info.ClusterManagementService"}, {"method": "closeGroup"}, {"role": "client"});
  }
  // Closes connections to a specific set of destinations across broker cluster
  ClusterManagementServiceClient.prototype.closeDestination = function closeDestination(messages, metadata) {
    const map = {};
    return this.closeDestinationMetrics(
      this.closeDestinationTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf;
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf ;
          this._rs.requestChannel(messages.map(function (message) {
            dataBuf = Buffer.from(message.serializeBinary());
            metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.ClusterManagementService', 'closeDestination', tracingMetadata, metadata || Buffer.alloc(0));
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
  // Closes all connections to a specific group cluster-wide
  ClusterManagementServiceClient.prototype.closeGroup = function closeGroup(messages, metadata) {
    const map = {};
    return this.closeGroupMetrics(
      this.closeGroupTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf;
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf ;
          this._rs.requestChannel(messages.map(function (message) {
            dataBuf = Buffer.from(message.serializeBinary());
            metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.broker.info.ClusterManagementService', 'closeGroup', tracingMetadata, metadata || Buffer.alloc(0));
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
  return ClusterManagementServiceClient;
}();

exports.ClusterManagementServiceClient = ClusterManagementServiceClient;

var ClusterManagementServiceServer = function () {
  function ClusterManagementServiceServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.closeDestinationTrace = rsocket_rpc_tracing.traceAsChild(tracer, "ClusterManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.ClusterManagementService"}, {"method": "closeDestination"}, {"rsocket.rpc.role": "server"});
    this.closeDestinationMetrics = rsocket_rpc_metrics.timed(meterRegistry, "ClusterManagementService", {"service": "io.netifi.proteus.broker.info.ClusterManagementService"}, {"method": "closeDestination"}, {"role": "server"});
    this.closeGroupTrace = rsocket_rpc_tracing.traceAsChild(tracer, "ClusterManagementService", {"rsocket.rpc.service": "io.netifi.proteus.broker.info.ClusterManagementService"}, {"method": "closeGroup"}, {"rsocket.rpc.role": "server"});
    this.closeGroupMetrics = rsocket_rpc_metrics.timed(meterRegistry, "ClusterManagementService", {"service": "io.netifi.proteus.broker.info.ClusterManagementService"}, {"method": "closeGroup"}, {"role": "server"});
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
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    };
  }
  ClusterManagementServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  ClusterManagementServiceServer.prototype.requestResponse = function requestResponse(payload) {
    return rsocket_flowable.Single.error(new Error('requestResponse() is not implemented'));
  };
  ClusterManagementServiceServer.prototype.requestStream = function requestStream(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestStream() is not implemented'));
  };
  ClusterManagementServiceServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  ClusterManagementServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return ClusterManagementServiceServer;
}();

exports.ClusterManagementServiceServer = ClusterManagementServiceServer;

