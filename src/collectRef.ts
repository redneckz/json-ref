import { type JSONNode } from './JSONNode';
import { visitRef } from './visitRef';

export const collectRef = (json: JSONNode): string[] => {
  const refs: string[] = [];
  visitRef(json, _ => refs.push(_));
  return refs;
};
