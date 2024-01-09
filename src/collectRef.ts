import { type JSONNode } from '@redneckz/json-op';
import { refEntries } from './refEntries';

export const collectRef = (json: JSONNode): string[] => refEntries(json).map(([, _]) => _);
