import {
  isJSONArray,
  isJSONRecord,
  isJSONRef,
  type JSONNode,
  type JSONRecord,
  type JSONRef,
  type JSONScalar
} from './JSONNode';

export const mapJSONNode = <R extends JSONNode | Promise<JSONNode> | void>(
  json: JSONNode,
  handlers: {
    ref: (json: JSONRef) => R;
    record: (json: JSONRecord) => R;
    array: (json: JSONNode[]) => R;
    scalar?: (json: JSONScalar | null) => R;
  }
): R => {
  if (isJSONRef(json)) {
    return handlers.ref(json);
  } else if (isJSONRecord(json)) {
    return handlers.record(json);
  } else if (isJSONArray(json)) {
    return handlers.array(json);
  } else {
    return handlers.scalar ? handlers.scalar(json) : (json as R);
  }
};
