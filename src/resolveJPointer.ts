import { JSONNode, isJSONArray, isJSONRecord } from './JSONNode';
import { parseJPointer } from './parseJPointer';

export const resolveJPointer = (json: JSONNode, uri: string): JSONNode =>
  parseJPointer(uri).reduce(selectNodeByKey, json);

const selectNodeByKey = (json: JSONNode, key: string): JSONNode => {
  if (!json || !key) {
    return json;
  }

  if (isJSONRecord(json)) {
    return json[key];
  } else if (isJSONArray(json)) {
    return json[parseInt(key, 10)];
  } else {
    return json;
  }
};
