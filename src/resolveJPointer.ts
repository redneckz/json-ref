import { fp, isJSONArray, isJSONRecord, type JSONArray, type JSONNode, type JSONRecord } from '@redneckz/json-op';
import { parseJPointer } from './parseJPointer';

export const resolveJPointer = (json: JSONNode, uri: string): JSONNode =>
  parseJPointer(uri).reduce(selectNodeByKey, json);

const selectNodeByKey = fp.table<[json: JSONNode, key: string], JSONNode>(
  [isJSONArray, (json, key) => (json as JSONArray)[parseInt(key, 10)]],
  [isJSONRecord, (json, key) => (json as JSONRecord)[key]],
  [fp.Predicate.trueF, fp.identity]
);
