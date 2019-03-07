import md5 from 'md5-js'

export default class ConnectionId {
  _bytes: number[]

  constructor(connectionIdSeed : String){
    _bytes = md5(connectionIdSeed).digest();
  }

  bytes(){
    return _bytes;
  }
}
