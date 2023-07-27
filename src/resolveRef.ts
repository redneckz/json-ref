import { type JSONNode, type JSONRecord } from './JSONNode';
import type { URIResolver } from './URIResolver';
import { mapJSONNode } from './mapJSONNode';
import { mergeRecords } from './mergeRecords';
import { resolveJPointer } from './resolveJPointer';

export const resolveRef = async (json: JSONNode, resolver: URIResolver): Promise<JSONNode> =>
  mapJSONNode(json, {
    ref: async ({ $ref, ...rest }) => resolveRef($ref ? resolveJPointer(await resolver($ref), $ref) : rest, resolver),
    record: async record =>
      mergeRecords(
        await Promise.all(
          Object.entries(record).map(
            async ([key, value]) => ({ [key]: await resolveRef(value, resolver) } as JSONRecord)
          )
        )
      ),
    array: async list => Promise.all(list.map(_ => resolveRef(_, resolver)))
  });
