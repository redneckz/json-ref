type JPointerPart = string;
export type JPointer = JPointerPart[];

export const parseJPointer = (uri: string): JPointer =>
  uri.includes('#')
    ? uri
        .substring(uri.indexOf('#') + 1)
        .split('/')
        .filter(Boolean)
    : [];
