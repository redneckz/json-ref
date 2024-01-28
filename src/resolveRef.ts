import { JSONPath, async, fp, type JSONNode } from '@redneckz/json-op';
import { isJSONRefPath } from './JSONRef';
import type { URIResolver } from './URIResolver';
import { resolveJPointer } from './resolveJPointer';

export const resolveRef = async (json: JSONNode, resolver: URIResolver): Promise<JSONNode> =>
  async.map(async ([path, node]) =>
    isJSONRefPath(path)
      ? [fp.init(path) as JSONPath.JSONPath, resolveJPointer(await resolver(node as string), node as string)]
      : [path, node]
  )(json);
