# Netifi Proteus JavaScript
This project has moved to https://github.com/netifi/netifi-js-client

[![Join the chat at https://gitter.im/netifi/general](https://badges.gitter.im/netifi/general.svg)](https://gitter.im/netifi/general) <a href='https://travis-ci.org/netifi-proteus/proteus-js'><img src='https://travis-ci.org/netifi-proteus/proteus-js.svg?branch=master'></a>

## Bugs and Feedback

For bugs, questions, and discussions please use the [Github Issues](https://github.com/netifi-proteus/proteus-js/issues).

## Installation

`yarn add proteus-js-client` OR

`npm install proteus-js-client`

## Building the monorepo

Node modules at the root should be installed using `yarn install` exclusively, due to differences between the Yarn and npm registries.

After installation, publish the build by running `lerna publish`.

## Basic Use

Proteus JavaScript presumes the use of the Proteus RPC routing model.

The model assumes the user will access a router via a gateway, providing its `group` identification (e.g. `mobile-devices`, `admin-services`, or other user-defined string). Optionally the user can provide a unique `destination` id (any user provided string), or a UUID will be generated automatically.

Once connected, the user can leverage the gateway to create RSockets that will route to particular `group`s (e.g. `metadata-services`, `mobile-clients`, or other application-specific identifier) or a `destination` on the network (e.g. `bobs-laptop`, `server-in-the-closet-nobody-knows-about`). These RSockets can then be passed to an RSocket RPC client and routing will be transparent and automatic.

A workflow would look something like this

```angular2html
const Proteus = require('proteus-js-client');
// This Proteus object acts as our gateway to the router
const proteus = Proteus.create({
  setup: {
    group: 'proteus-example',
  //destination: generated UUID if omitted  
    accessKey: 9007199254740991,
    accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY='
  },
  transport: {
    url
  }
});
```

The configuration passed to `Proteus.create` has this Flow type spec

```angular2html
export type ProteusConfig = {|
  serializers?: PayloadSerializers<Buffer, Buffer>,
  setup: {|
    group: string,
    destination?: string,
    tags?: Tags,
    keepAlive?: number,
    lifetime?: number,
    accessKey: number,
    accessToken: string,
    connectionId?: string,
    additionalFlags?: {|
      public?: boolean,
    |}
  |},
  transport: {|
    url?: string,
    wsCreator?: (url: string) => WebSocket,
    connection?: DuplexConnection,
  |},
  responder?: Responder<Buffer, Buffer>,
|};
```

Sane defaults are provided for each optional field, with the exception of `transport`. Either a URL or an existing DuplexConnection (e.g. `RSocketTcpClient`) are required. The URL is used to create an `RSocketWebSocketClient` under the covers.

A `Responder<Buffer, Buffer>` is created and simply implements the RSocket defined methods (i.e. `fireAndForget`, `requestResponse`, `requestStream`, `requestChannel`) and routes them to registered services, addressed below in `As a Server`.


### As a Client
The `proteus` object is used to generate RSockets to be used by clients and to attach service handlers. This package includes the BrokerInfoServiceClient (routing services); here is an example of scanning all router instances and requesting all connected `destination`s

```angular2html
const { Empty } = require('google-protobuf/google/protobuf/empty_pb');

// Here we use the proteus gateway to create an RSocket that routes 
// to any instance that is registered in the 'broker-services' group
const brokerServices = new BrokerInfoServiceClient(proteus.group('broker-services'));

// This method is defined in the router services protobuf
// rpc Brokers (google.protobuf.Empty) returns (stream Broker) {}

brokerServices.brokers(new Empty(), Buffer.alloc(0)).subscribe({
  onComplete: () => console.log('All brokers scanned'),
  onError: error => console.error(error),
  onNext: broker => {

    console.log("Scanning destinations connected to broker", broker);
  
    // Get Stream of All Destinations on Broker, defined in the router services protobuf
    // rpc Destinations (Broker) returns (stream Destination) {}
  
    this.brokerInfoService.destinations(broker, Buffer.alloc(0)).subscribe({
      onComplete: () => console.log('All destinations scanned'),
      onError: error => console.error(error),
      onNext: destination => {
        console.log("Destination connected to broker", destination);
      },
      onSubscribe: subscription => {
        subscription.request(100);
      }
    });
  },
  onSubscribe: subscription => {
    subscription.request(100);
  }
});
```

### As a Server

The proteus gateway can provide services to the network as well as call out. To add services to the gateway, the user must provide a service implementation and the name of the service that clients will know to call.

Assume we have defined a service in protobuf

```angular2html
service RandomStringGenerator {

    // Returns a random string between size 'min' and 'max' defined in the RandomStringRequest
    rpc GenerateString (RandomStringRequest) returns (RandomStringResponse) {}
}

message RandomStringRequest {
    int32 min = 1;
    int32 max = 2;
}

message RandomStringResponse {
    string generated = 1;
}
```

And we have used the `rsocket-rpc-protobuf` generator for the Client and Server classes.

```angular2html
// A local implementation that given a random string request, generates a Single<RandomStringResponse>
const localStringGenerator = {
    generateString: (message, metadata) => {
        const min = message.getMin();
        const max = message.getMax();

        const size = Math.floor(Math.random() * max) + min;
        let word = "";
        for(var j = 0; j < size; j++){
            word += generateChar();
        }
        return Single.of(nextWord);
    }
};

// We wrap our local implementation in the protobuf-generated Server code that unwraps and dispatches requests    
const randomStringService = new RandomStringGeneratorServer(localStringGenerator);

// Register our RSocket random string service with our gateway by the service name that we expect Clients to use
proteus.addService('io.proteus.demo.random-string-service', randomStringService);
```


Now our gateway can generate RSockets for the purpose of reaching out to the network and can register handlers so that others on the network can use our services!


## Observables

We also provide a utility method to convert the `rsocket-flowable` types to the more familiar `Observable`.

```angular2html

const {Single, Flowable} = require('rsocket-flowable');
const {toObservable} = require('proteus-js-client');

const monoObservable = toObservable(Single.of("some value"));

const manyObservable = toObservable(Flowable.just(...[1, 2, 3, 4]));

```

This loses the semantic of backpressure (i.e. `onSubscribe` and an `ISubscription` with `request n`/`cancel` methods), but may be more palatable to developers with an existing RxJS codebase. 

## License
Copyright 2017 Netifi Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
