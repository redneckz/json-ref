export type JSONNull = null;
export type JSONScalar = string | number | boolean;

export type JSONRecord = { [key in string]: JSONNode };
export type JSONRef = { $ref: string } & JSONRecord;

export type JSONNode = JSONScalar | JSONNull | JSONNode[] | JSONRecord | JSONRef;

export const isJSONArray = (_: JSONNode): _ is JSONNode[] => Boolean(_ && Array.isArray(_));

export const isJSONRecord = (_: JSONNode): _ is JSONRecord => Boolean(_ && !Array.isArray(_) && typeof _ === 'object');

export const isJSONRef = (_: JSONNode): _ is JSONRef => Boolean(isJSONRecord(_) && typeof _.$ref === 'string');
