export const mergeRecords = <K extends string, V, R extends Record<K, V>>(entries: R[]): R =>
  entries.reduce((acc, _) => Object.assign(acc, _), {} as R);
