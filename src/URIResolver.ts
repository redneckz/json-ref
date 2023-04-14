import type { JSONNode } from './JSONNode';

export type URIResolver = (uri: string) => Promise<JSONNode> | JSONNode;
