import md5 from 'js-md5';

export default class ConnectionId {
  _hash: string;

  constructor(connectionIdSeed: string) {
    this._hash = md5.digest(connectionIdSeed);
  }

  static fromBytes(bytes) {
    const connToReturn = new ConnectionId('');
    connToReturn._hash = Array.from(bytes);
    return connToReturn;
  }

  bytes() {
    return Uint8Array.from(this._hash);
  }

  hash() {
    return this._hash;
  }
}
