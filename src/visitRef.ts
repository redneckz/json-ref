import { type JSONNode } from './JSONNode';
import { mapJSONNode } from './mapJSONNode';

type JSONNodePath = (string | number)[];
export type RefVisitor = (ref: string, path: JSONNodePath) => void;

export const visitRef = (json: JSONNode, visitor: RefVisitor, path: JSONNodePath = []): void => {
  mapJSONNode(json, {
    ref: json => visitor(json.$ref, path),
    record: record => {
      for (const key in record) visitRef(record[key], visitor, [...path, key]);
    },
    array: list => {
      for (let i = 0; i < list.length; i++) visitRef(list[i], visitor, [...path, i]);
    }
  });
};
