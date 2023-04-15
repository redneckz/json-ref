import { JSONNode, JSONRecord, JSONRef, isJSONArray, isJSONRecord, isJSONRef } from './JSONNode';
import type { URIResolver } from './URIResolver';
import { resolveJPointer } from './resolveJPointer';

export const resolveRef = async (json: JSONNode, resolver: URIResolver): Promise<JSONNode> => {
  if (isJSONRef(json)) {
    return mapJSONRef(json, resolver);
  } else if (isJSONRecord(json)) {
    return mapJSONRecord(json, resolver);
  } else if (isJSONArray(json)) {
    return mapJSONArray(json, resolver);
  } else {
    return json;
  }
};

const mapJSONArray = async (list: JSONNode[], resolver: URIResolver): Promise<JSONNode[]> =>
  Promise.all(list.map(_ => resolveRef(_, resolver)));

const mapJSONRecord = async (record: JSONRecord, resolver: URIResolver): Promise<JSONRecord> =>
  (
    await Promise.all(
      Object.entries(record).map(async ([key, value]) => ({
        [key]: await resolveRef(value, resolver)
      }))
    )
  ).reduce((acc, _) => Object.assign(acc, _), {});

const mapJSONRef = async ({ $ref, ...rest }: JSONRef, resolver: URIResolver): Promise<JSONNode> =>
  $ref ? resolveJPointer(await resolver($ref), $ref) : rest;
