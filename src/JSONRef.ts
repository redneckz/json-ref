import { JSONPath, isJSONRecord, type JSONNode, type JSONRecord } from '@redneckz/json-op';

export type JSONRef = { $ref: string } & JSONRecord;

export const isJSONRef = (_: JSONNode | undefined): _ is JSONRef =>
  Boolean(isJSONRecord(_) && typeof _.$ref === 'string');

export const isJSONRefPath = JSONPath.endsWith(['$ref']);
