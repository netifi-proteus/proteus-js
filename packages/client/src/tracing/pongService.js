'use strict';

import {Ping, Pong} from '../proteus/testing/ping-pong_pb';
import {Single, Flowable} from 'rsocket-flowable';

export class PongService {
  constructor() {}

  ping(message: Ping, metadata: Buffer): Single<Pong> {
    console.log('Received ping from ' + message.getMessage() + ' - responding');
    const pong = new Pong();
    pong.setMessage('Pong!');
    return Single.of(pong);
  }

  pingFireAndForget(message: Ping, metadata: Buffer): void {
    console.log('Received ping from ' + message.getMessage());
  }

  pingStream(message: Ping, metadata: Buffer): Flowable<Pong> {
    let count = 1;
    const responses = [];
    for (let i = 1; i < 6; i++) {
      const pong = new Pong();
      pong.setMessage('Pong ' + count++);
      responses.push(pong);
    }
    console.log(
      'Received ping from ' +
        message.getMessage() +
        ' returning flowable of ' +
        responses,
    );
    return Flowable.just(...responses);
  }
}
