import {SpanContext} from "./SpanContext";

export type SpanRelationship = "ChildOf" | "FollowsFrom";

export class SpanReference{
  relationship : SpanRelationship;
  context: SpanContext;

  constructor(relationship: SpanRelationship, context: SpanContext){
    this.relationship = relationship;
    this.context = context;
  }
}