import { JSONPath, fp, map, type JSONNode } from '@redneckz/json-op';
import { isJSONRefPath } from './JSONRef';
import type { URIResolver } from './URIResolver';
import { resolveJPointer } from './resolveJPointer';

export const resolveRef = (json: JSONNode, resolver: URIResolver<JSONNode>): JSONNode =>
  map(([path, node]) =>
    isJSONRefPath(path)
      ? [
          fp.init(path) as JSONPath.JSONPath,
          resolveRef(resolveJPointer(resolver(node as string), node as string), resolver)
        ]
      : [path, node]
  )(json);
