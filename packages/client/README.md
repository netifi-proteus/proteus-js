# proteus-js-client

proteus-js-client allows Javascript apps to connect to a Proteus broker and access services. By providing a destination name and login credentials, the app becomes a new destination on the network, and can both send and receive messages using the RSocket protocol.

## Installation

```
yarn add proteus-js-client
```

The Proteus client should be passed a configuration object. Here are its properties:

```
const config = {
  setup: {
    group: '', // required - group your client will be visible in
    accessKey: 123, // required
    accessToken: 'abc', // required
    keepAlive: 60000, // default value
    lifetime: 360000, // default value
    tags: { // key-value pairs
      destination: 'human-readable name for this destination'
    },
    connectionId: 'seed for md5 hash',
    additionalFlags: {
      public: false // default value
    }
  },
  transport: {
    url: 'the websocket url of your server',
    wsCreator: (url) => { // only required for Node in order to provide a WebSocket object
      return new WebSocket(url);
    },
    connection // TODO: describe
  },
  serializers, // TODO: describe
  responder // TODO: describe
};

const proteusClient = Proteus.create(config);
```

For more information on how to set up the client, go to [docs.netifi.com](https://docs.netifi.com) and click the menu link "Proteus JS Client".
