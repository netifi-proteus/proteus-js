/**
 * Copyright (c) 2017-present, Netifi Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @flow
 */

declare module 'google-protobuf' {
  declare export type ByteSource = ArrayBuffer | Uint8Array | number[] | string;
  declare export type ScalarFieldType = boolean | number | string;
  declare export type RepeatedFieldType = ScalarFieldType[] | Uint8Array[];
  declare export type AnyFieldType = ScalarFieldType | RepeatedFieldType | Uint8Array;
  declare export type FieldValue = string |
    number |
    boolean |
    Uint8Array |
    FieldValueArray |
    void;
  declare export type FieldValueArray = {} & Array<any>

  declare export class Message {
    getJsPbMessageId(): (string | void);
    initialize(
      msg: Message,
      data: any[],
      messageId: (string | number),
      suggestedPivot: number,
      repeatedFields?: number[],
      oneofFields?: number[][] | null): void;
    toObjectList<T>(
      field: T[],
      toObjectFn: (includeInstance: boolean, data: T) => {},
      includeInstance?: boolean): Array<{}>;
    toObjectExtension(
      msg: Message,
      obj: {},
      extensions: {
        [key: number]: ExtensionFieldInfo<Message>
      },
      getExtensionFn: (fieldInfo: ExtensionFieldInfo<Message>) => Message,
      includeInstance?: boolean): void;
    serializeBinaryExtensions(
      proto: Message,
      writer: BinaryWriter,
      extensions: {
        [key: number]: ExtensionFieldBinaryInfo<Message>
      },
      getExtensionFn: <T>(fieldInfo: ExtensionFieldInfo<T>) => T): void;
    readBinaryExtension(
      proto: Message,
      reader: BinaryReader,
      extensions: {
        [key: number]: ExtensionFieldBinaryInfo<Message>
      },
      setExtensionFn: <T>(fieldInfo: ExtensionFieldInfo<T>, val: T) => void): void;
    getField(msg: Message, fieldNumber: number): FieldValue | null;
    getOptionalFloatingPointField(msg: Message, fieldNumber: number): number | void;
    getRepeatedFloatingPointField(msg: Message, fieldNumber: number): number[];
    bytesAsB64(bytes: Uint8Array): string;
    bytesAsU8(str: string): Uint8Array;
    bytesListAsB64(bytesList: Uint8Array[]): string[];
    bytesListAsU8(strList: string[]): Uint8Array[];
    getFieldWithDefault<T>(msg: Message, fieldNumber: number, defaultValue: T): T;
    getMapField(
      msg: Message,
      fieldNumber: number,
      noLazyCreate: boolean,
      valueCtor: typeof Message): Map<any, any>;
    setField(msg: Message, fieldNumber: number, value: FieldValue): void;
    addToRepeatedField(msg: Message, fieldNumber: number, value: any, index?: number): void;
    setOneofField(msg: Message, fieldNumber: number, oneof: number[], value: FieldValue): void;
    computeOneofCase(msg: Message, oneof: number[]): number;
    getWrapperField<T>(
      msg: Message,
      ctor: {
        new(): T
      },
      fieldNumber: number,
      required?: number): T;
    getRepeatedWrapperField<T>(msg: Message, ctor: {
      new(): T
    }, fieldNumber: number): T[];
    setWrapperField<T>(msg: Message, fieldNumber: number, value?: (T | Map<any, any>)): void;
    setOneofWrapperField(msg: Message, fieldNumber: number, oneof: number[], value: any): void;
    setRepeatedWrapperField<T>(msg: Message, fieldNumber: number, value?: T[]): void;
    addToRepeatedWrapperField<T>(
      msg: Message,
      fieldNumber: number,
      value: T | void,
      ctor: {
        new(): T
      },
      index?: number): T;
    toMap(
      field: any[],
      mapKeyGetterFn: (field: any) => string,
      toObjectFn?: (includeInstance: boolean, msg: Message) => {},
      includeInstance?: boolean): void;
    toArray(): any[];
    toString(): string;
    getExtension<T>(fieldInfo: ExtensionFieldInfo<T>): T;
    setExtension<T>(fieldInfo: ExtensionFieldInfo<T>, value: T): void;
    difference<T>(m1: T, m2: T): T;
    equals(m1: Message, m2: Message): boolean;
    compareExtensions(extension1: {}, extension2: {}): boolean;
    compareFields(field1: any, field2: any): boolean;
    cloneMessage(): Message;
    clone(): Message;
    clone<T>(msg: T): T;
    cloneMessage<T>(msg: T): T;
    copyInto(fromMessage: Message, toMessage: Message): void;
    registerMessageType(id: number, constructor: typeof Message): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): {};
    deserializeBinary(bytes: Uint8Array): Message;
    deserializeBinaryFromReader(message: Message, reader: BinaryReader): Message;
    serializeBinaryToWriter(message: Message, writer: BinaryWriter): void;
    toObject(includeInstance: boolean, msg: Message): {};
    extensions: {
      [key: number]: ExtensionFieldInfo<Message>
    };
    extensionsBinary: {
      [key: number]: ExtensionFieldBinaryInfo<Message>
    }
  }

  declare export class ExtensionFieldInfo<T> {
    fieldIndex: number;
    fieldName: number;
    ctor: typeof Message;
    toObjectFn: (includeInstance: boolean, msg: Message) => {};
    isRepeated: number;
    constructor(fieldIndex: number, fieldName: {
      [key: string]: number
    }, ctor: typeof Message, toObjectFn: (includeInstance: boolean, msg: Message) => {}, isRepeated: number): this;
    isMessageType(): boolean
  }

  declare export class ExtensionFieldBinaryInfo<T> {
    fieldInfo: ExtensionFieldInfo<T>;
    binaryReaderFn: BinaryRead;
    binaryWriterFn: BinaryWrite;
    opt_binaryMessageSerializeFn: (msg: Message, writer: BinaryWriter) => void;
    opt_binaryMessageDeserializeFn: (msg: Message, reader: BinaryReader) => Message;
    opt_isPacked: boolean;
    constructor(fieldInfo: ExtensionFieldInfo<T>, binaryReaderFn: BinaryRead, binaryWriterFn: BinaryWrite, opt_binaryMessageSerializeFn: (msg: Message, writer: BinaryWriter) => void, opt_binaryMessageDeserializeFn: (msg: Message, reader: BinaryReader) => Message, opt_isPacked: boolean): this
  }

  declare export type BinaryReadReader = (msg: any, binaryReader: BinaryReader) => void;
  declare export type BinaryRead = (msg: any, reader: BinaryReadReader) => void;
  declare export type BinaryWriteCallback = (value: any, binaryWriter: BinaryWriter) => void;
  declare export type BinaryWrite = (fieldNumber: number, value: any, writerCallback: BinaryWriteCallback) => void;

  declare export class BinaryReader {
    constructor(bytes?: ByteSource, start?: number, length?: number): this;
    alloc(bytes?: ByteSource, start?: number, length?: number): BinaryReader;
    alloc(bytes?: ByteSource, start?: number, length?: number): BinaryReader;
    free(): void;
    getFieldCursor(): number;
    getCursor(): number;
    getBuffer(): Uint8Array;
    getFieldNumber(): number;
    getWireType(): number;
    isEndGroup(): boolean;
    getError(): boolean;
    setBlock(bytes?: ByteSource, start?: number, length?: number): void;
    reset(): void;
    advance(count: number): void;
    nextField(): boolean;
    unskipHeader(): void;
    skipMatchingFields(): void;
    skipVarintField(): void;
    skipDelimitedField(): void;
    skipFixed32Field(): void;
    skipFixed64Field(): void;
    skipGroup(): void;
    skipField(): void;
    registerReadCallback(callbackName: string, callback: (binaryReader: BinaryReader) => any): void;
    runReadCallback(callbackName: string): any;
    readAny(fieldType: number): AnyFieldType;
    readMessage: BinaryRead;
    readGroup(field: number, message: Message, reader: BinaryReadReader): void;
    getFieldDecoder(): BinaryDecoder;
    readInt32(): number;
    readInt32String(): string;
    readInt64(): number;
    readInt64String(): string;
    readUint32(): number;
    readUint32String(): string;
    readUint64(): number;
    readUint64String(): string;
    readSint32(): number;
    readSint64(): number;
    readSint64String(): string;
    readFixed32(): number;
    readFixed64(): number;
    readFixed64String(): string;
    readSfixed32(): number;
    readSfixed32String(): string;
    readSfixed64(): number;
    readSfixed64String(): string;
    readFloat(): number;
    readDouble(): number;
    readBool(): boolean;
    readEnum(): number;
    readString(): string;
    readBytes(): Uint8Array;
    readVarintHash64(): string;
    readFixedHash64(): string;
    readPackedInt32(): number[];
    readPackedInt32String(): string[];
    readPackedInt64(): number[];
    readPackedInt64String(): string[];
    readPackedUint32(): number[];
    readPackedUint32String(): string[];
    readPackedUint64(): number[];
    readPackedUint64String(): string[];
    readPackedSint32(): number[];
    readPackedSint64(): number[];
    readPackedSint64String(): string[];
    readPackedFixed32(): number[];
    readPackedFixed64(): number[];
    readPackedFixed64String(): string[];
    readPackedSfixed32(): number[];
    readPackedSfixed64(): number[];
    readPackedSfixed64String(): string[];
    readPackedFloat(): number[];
    readPackedDouble(): number[];
    readPackedBool(): boolean[];
    readPackedEnum(): number[];
    readPackedVarintHash64(): string[];
    readPackedFixedHash64(): string[]
  }

  declare export class BinaryWriter {
    constructor(): this;
    writeSerializedMessage(bytes: Uint8Array, start: number, end: number): void;
    maybeWriteSerializedMessage(bytes?: Uint8Array, start?: number, end?: number): void;
    reset(): void;
    getResultBuffer(): Uint8Array;
    getResultBase64String(): string;
    beginSubMessage(field: number): void;
    endSubMessage(field: number): void;
    writeAny(fieldType: number, field: number, value: AnyFieldType): void;
    writeInt32(field: number, value?: number): void;
    writeInt32String(field: number, value?: string): void;
    writeInt64(field: number, value?: number): void;
    writeInt64String(field: number, value?: string): void;
    writeUint32(field: number, value?: number): void;
    writeUint32String(field: number, value?: string): void;
    writeUint64(field: number, value?: number): void;
    writeUint64String(field: number, value?: string): void;
    writeSint32(field: number, value?: number): void;
    writeSint64(field: number, value?: number): void;
    writeSint64String(field: number, value?: string): void;
    writeFixed32(field: number, value?: number): void;
    writeFixed64(field: number, value?: number): void;
    writeFixed64String(field: number, value?: string): void;
    writeSfixed32(field: number, value?: number): void;
    writeSfixed64(field: number, value?: number): void;
    writeSfixed64String(field: number, value?: string): void;
    writeFloat(field: number, value?: number): void;
    writeDouble(field: number, value?: number): void;
    writeBool(field: number, value?: boolean): void;
    writeEnum(field: number, value?: number): void;
    writeString(field: number, value?: string): void;
    writeBytes(field: number, value?: ByteSource): void;
    writeMessage: BinaryWrite;
    writeGroup(field: number, value: any, writeCallback: BinaryWriteCallback): void;
    writeFixedHash64(field: number, value?: string): void;
    writeVarintHash64(field: number, value?: string): void;
    writeRepeatedInt32(field: number, value?: number[]): void;
    writeRepeatedInt32String(field: number, value?: string[]): void;
    writeRepeatedInt64(field: number, value?: number[]): void;
    writeRepeatedInt64String(field: number, value?: string[]): void;
    writeRepeatedUint32(field: number, value?: number[]): void;
    writeRepeatedUint32String(field: number, value?: string[]): void;
    writeRepeatedUint64(field: number, value?: number[]): void;
    writeRepeatedUint64String(field: number, value?: string[]): void;
    writeRepeatedSint32(field: number, value?: number[]): void;
    writeRepeatedSint64(field: number, value?: number[]): void;
    writeRepeatedSint64String(field: number, value?: string[]): void;
    writeRepeatedFixed32(field: number, value?: number[]): void;
    writeRepeatedFixed64(field: number, value?: number[]): void;
    writeRepeatedFixed64String(field: number, value?: string[]): void;
    writeRepeatedSfixed32(field: number, value?: number[]): void;
    writeRepeatedSfixed64(field: number, value?: number[]): void;
    writeRepeatedSfixed64String(field: number, value?: string[]): void;
    writeRepeatedFloat(field: number, value?: number[]): void;
    writeRepeatedDouble(field: number, value?: number[]): void;
    writeRepeatedBool(field: number, value?: boolean[]): void;
    writeRepeatedEnum(field: number, value?: number[]): void;
    writeRepeatedString(field: number, value?: string[]): void;
    writeRepeatedBytes(field: number, value?: ByteSource[]): void;
    writeRepeatedMessage(field: number, value: Message[], writerCallback: BinaryWriteCallback): void;
    writeRepeatedGroup(field: number, value: Message[], writerCallback: BinaryWriteCallback): void;
    writeRepeatedFixedHash64(field: number, value?: string[]): void;
    writeRepeatedVarintHash64(field: number, value?: string[]): void;
    writePackedInt32(field: number, value?: number[]): void;
    writePackedInt32String(field: number, value?: string[]): void;
    writePackedInt64(field: number, value?: number[]): void;
    writePackedInt64String(field: number, value?: string[]): void;
    writePackedUint32(field: number, value?: number[]): void;
    writePackedUint32String(field: number, value?: string[]): void;
    writePackedUint64(field: number, value?: number[]): void;
    writePackedUint64String(field: number, value?: string[]): void;
    writePackedSint32(field: number, value?: number[]): void;
    writePackedSint64(field: number, value?: number[]): void;
    writePackedSint64String(field: number, value?: string[]): void;
    writePackedFixed32(field: number, value?: number[]): void;
    writePackedFixed64(field: number, value?: number[]): void;
    writePackedFixed64String(field: number, value?: string[]): void;
    writePackedSfixed32(field: number, value?: number[]): void;
    writePackedSfixed64(field: number, value?: number[]): void;
    writePackedSfixed64String(field: number, value?: string[]): void;
    writePackedFloat(field: number, value?: number[]): void;
    writePackedDouble(field: number, value?: number[]): void;
    writePackedBool(field: number, value?: boolean[]): void;
    writePackedEnum(field: number, value?: number[]): void;
    writePackedFixedHash64(field: number, value?: string[]): void;
    writePackedVarintHash64(field: number, value?: string[]): void
  }

  declare export class BinaryEncoder {
    constructor(): this;
    length(): number;
    end(): number[];
    writeSplitVarint64(lowBits: number, highBits: number): void;
    writeSplitFixed64(lowBits: number, highBits: number): void;
    writeUnsignedVarint32(value: number): void;
    writeSignedVarint32(value: number): void;
    writeUnsignedVarint64(value: number): void;
    writeSignedVarint64(value: number): void;
    writeZigzagVarint32(value: number): void;
    writeZigzagVarint64(value: number): void;
    writeZigzagVarint64String(value: string): void;
    writeUint8(value: number): void;
    writeUint16(value: number): void;
    writeUint32(value: number): void;
    writeUint64(value: number): void;
    writeInt8(value: number): void;
    writeInt16(value: number): void;
    writeInt32(value: number): void;
    writeInt64(value: number): void;
    writeInt64String(value: string): void;
    writeFloat(value: number): void;
    writeDouble(value: number): void;
    writeBool(value: boolean): void;
    writeEnum(value: number): void;
    writeBytes(bytes: Uint8Array): void;
    writeVarintHash64(hash: string): void;
    writeFixedHash64(hash: string): void;
    writeString(value: string): number
  }

  declare export class BinaryDecoder {
    constructor(bytes?: ByteSource, start?: number, length?: number): this;
    alloc(bytes?: ByteSource, start?: number, length?: number): BinaryDecoder;
    free(): void;
    clone(): BinaryDecoder;
    clear(): void;
    getBuffer(): Uint8Array;
    setBlock(data: ByteSource, start?: number, length?: number): void;
    getEnd(): number;
    setEnd(end: number): void;
    reset(): void;
    getCursor(): number;
    setCursor(cursor: number): void;
    advance(count: number): void;
    atEnd(): boolean;
    pastEnd(): boolean;
    getError(): boolean;
    skipVarint(): void;
    unskipVarint(value: number): void;
    readUnsignedVarint32(): number;
    readSignedVarint32(): number;
    readUnsignedVarint32String(): number;
    readSignedVarint32String(): number;
    readZigzagVarint32(): number;
    readUnsignedVarint64(): number;
    readUnsignedVarint64String(): number;
    readSignedVarint64(): number;
    readSignedVarint64String(): number;
    readZigzagVarint64(): number;
    readZigzagVarint64String(): number;
    readUint8(): number;
    readUint16(): number;
    readUint32(): number;
    readUint64(): number;
    readUint64String(): string;
    readInt8(): number;
    readInt16(): number;
    readInt32(): number;
    readInt64(): number;
    readInt64String(): string;
    readFloat(): number;
    readDouble(): number;
    readBool(): boolean;
    readEnum(): number;
    readString(length: number): string;
    readStringWithLength(): string;
    readBytes(length: number): Uint8Array;
    readVarintHash64(): string;
    readFixedHash64(): string
  }
}
