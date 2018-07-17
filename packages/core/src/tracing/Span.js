import { SpanContext } from "./SpanContext";
import Tag from './Tag';

export class Span{

  getContext() : SpanContext{

  }

  setOperationName(newName: string) : void{

  }

  finish(timestamp?: number): void{

  }

  addTag(name: string, value: string): void{

  }

  addBaggage(name: string, value: string): void{

  }

  getBaggageItem(name: string): string {

  }
}