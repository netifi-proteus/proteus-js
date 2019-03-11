import md5 from 'js-md5';

export default class ConnectionId {
  _bytes: number[];

  constructor(connectionIdSeed: string) {
    this._bytes = Uint8Array.from(md5.digest(connectionIdSeed));
  }

  bytes() {
    return this._bytes;
  }
}
