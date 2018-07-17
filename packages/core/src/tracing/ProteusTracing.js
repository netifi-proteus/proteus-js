import {UTF8Encoder, BufferEncoder, createBuffer} from 'rsocket-core';
import {Flowable} from 'rsocket-flowable';

import Tag from './Tag';
import {SpanSubscriber} from './SpanSubscriber';
import {SpanContext} from './SpanContext';
import {Tracer} from './Tracer';

export function mapToBuffer(map: Object): Buffer {
  if (!map || Object.keys(map).length <= 0) {
    return Buffer.alloc(0);
  }

  const aggregatedTags = Object.keys(map).reduce(
    (aggregate, key) => {
      const val = map[key];
      const keyLen = UTF8Encoder.byteLength(key);
      const keyBuf = Buffer.alloc(keyLen);
      UTF8Encoder.encode(key, keyBuf, 0, keyLen);

      const valLen = UTF8Encoder.byteLength(val);
      const valBuf = Buffer.alloc(valLen);
      UTF8Encoder.encode(val, valBuf, 0, valLen);

      const newEntries = aggregate.entries;
      newEntries.push({keyLen, keyBuf, valLen, valBuf});

      return {
        //4 for the sizes plus the actual key and actual value
        totalSize: aggregate.totalSize + 4 + keyLen + valLen,
        entries: newEntries,
      };
    },
    {totalSize: 0, entries: []},
  );

  let offset = 0;
  const resultBuf = Buffer.alloc(aggregatedTags.totalSize);
  aggregatedTags.entries.forEach(entry => {
    resultBuf.writeUInt16BE(entry.keyLen, offset);
    offset += 2; //2 bytes for key length

    BufferEncoder.encode(
      entry.keyBuf,
      resultBuf,
      offset,
      offset + entry.keyLen,
    );
    offset += entry.keyLen;

    resultBuf.writeUInt16BE(entry.valLen, offset);
    offset += 2;

    BufferEncoder.encode(
      entry.valBuf,
      resultBuf,
      offset,
      offset + entry.valLen,
    );
    offset += entry.valLen;
  });

  return resultBuf;
}

export function bufferToMap(buffer: Buffer): Object {
  const result = {};

  let offset = 0;
  while (offset < buffer.length) {
    let keyLen = buffer.readUInt16BE(offset);
    offset += 2;

    let key = UTF8Encoder.decode(buffer, offset, offset + keyLen);
    offset += keyLen;

    let valLen = buffer.readUInt16BE(offset);
    offset += 2;

    let value = UTF8Encoder.decode(buffer, offset, offset + valLen);
    offset += valLen;

    result[key] = value;
  }

  return result;
}

export function trace<T>(
  tracer: Tracer,
  name: String,
  ...tags: Tag
): Object => (Flowable<T>) => Flowable<T> {
  if (tracer && name) {
    return (map: Object) => {
      (flowable: Flowable<T>) => {
        flowable.lift((subscriber: ISubscriber<T>) => {
          new SpanSubscriber(subscriber, null, tracer, map, name, tags);
        });
      };
    };
  } else {
    return (map: Object) => {
      (publisher: Flowable<T>) => publisher;
    };
  }
}

export function traceAsChild<T>(
  tracer: Tracer,
  name: String,
  ...tags: Tag
): SpanContext => (Flowable<T>) => Flowable<T> {
  if (tracer && name) {
    return (context: SpanContext) => {
      return (flowable: Flowable<T>) => {
        flowable.lift((subscriber: ISubscriber<T>) => {
          new SpanSubscriber(subscriber, context, tracer, null, name, tags);
        });
      };
    };
  } else {
    return (context: SpanContext) => {
      (publisher: Flowable<T>) => publisher;
    };
  }
}