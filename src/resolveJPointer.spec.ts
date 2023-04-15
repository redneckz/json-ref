import { resolveJPointer } from './resolveJPointer';

describe('resolveJPointer', () => {
  it('should return JSON part addressed by URI fragment', () => {
    expect(resolveJPointer({ foo: { bar: { baz: 123 } } }, 'http://plugh.ru#/foo/bar/baz')).toBe(123);
  });

  it('should return whole JSON if no fragment provided', () => {
    const json = { foo: { bar: { baz: 123 } } };
    expect(resolveJPointer(json, 'http://plugh.ru')).toEqual(json);
  });

  it('should return JSON list item addressed by URI fragment with index', () => {
    expect(resolveJPointer({ foo: [1, [2], 3] }, 'http://plugh.ru#/foo/1/0')).toBe(2);
  });

  it('should return undefined if no JSON part can be addressed by provided URI fragment', () => {
    expect(resolveJPointer({ foo: { bar: [1, 2, 3] } }, '#/foo/invalid')).toBe(undefined);
  });
});
