import { type JSONPath, fp, leafs, type JSONNode } from '@redneckz/json-op';
import { isJSONRefPath } from './JSONRef';

export type JSONRefEntry = [path: JSONPath.JSONPath, ref: string];

export const refEntries = (json: JSONNode): JSONRefEntry[] =>
  leafs(json).filter(fp.t0(isJSONRefPath)) as JSONRefEntry[];
