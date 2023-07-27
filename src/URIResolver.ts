import type { JSONNode } from './JSONNode';

export type URIResolver<R extends Promise<JSONNode> | JSONNode = Promise<JSONNode>> = (uri: string) => R;
