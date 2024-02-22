import { type JSONNode } from '@redneckz/json-op';
import { refEntries } from './refEntries';
import { unique } from './unique';

export const collectRef = (json: JSONNode): string[] => unique(refEntries(json).map(([, _]) => _));
