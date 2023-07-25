import { type JSONNode, isJSONArray, isJSONRecord, isJSONRef, type JSONRecord } from './JSONNode';

type JSONNodePath = (string | number)[];
export type RefVisitor = (ref: string, path: JSONNodePath) => void;

export const visitRef = (json: JSONNode, visitor: RefVisitor, path: JSONNodePath = []): void => {
  if (isJSONRef(json)) {
    visitor(json.$ref, path);
  } else if (isJSONRecord(json)) {
    visitJSONRecord(json, visitor, path);
  } else if (isJSONArray(json)) {
    visitJSONArray(json, visitor, path);
  }
};

const visitJSONRecord = (record: JSONRecord, visitor: RefVisitor, path: JSONNodePath): void => {
  for (const key in record) visitRef(record[key], visitor, [...path, key]);
};

const visitJSONArray = (list: JSONNode[], visitor: RefVisitor, path: JSONNodePath): void => {
  for (let i = 0; i < list.length; i++) visitRef(list[i], visitor, [...path, i]);
};
