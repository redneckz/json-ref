import { type JSONNode } from '@redneckz/json-op';

export type URIResolver<R extends Promise<JSONNode> | JSONNode = Promise<JSONNode>> = (uri: string) => R;
