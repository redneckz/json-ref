import { type JSONNode, type JSONRecord } from './JSONNode';
import type { URIResolver } from './URIResolver';
import { mapJSONNode } from './mapJSONNode';
import { mergeRecords } from './mergeRecords';
import { resolveJPointer } from './resolveJPointer';

export const resolveRef = (json: JSONNode, resolver: URIResolver<JSONNode>): JSONNode =>
  mapJSONNode(json, {
    ref: ({ $ref, ...rest }) => resolveRef($ref ? resolveJPointer(resolver($ref), $ref) : rest, resolver),
    record: record =>
      mergeRecords(
        Object.entries(record).map(([key, value]) => ({ [key]: resolveRef(value, resolver) } as JSONRecord))
      ),
    array: list => list.map(_ => resolveRef(_, resolver))
  });
