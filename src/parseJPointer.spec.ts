import { parseJPointer } from './parseJPointer';

describe('parseJPointer', () => {
  it('should split URI fragment into parts by "/" separator', () => {
    expect(parseJPointer('#/foo/bar/baz')).toEqual(['foo', 'bar', 'baz']);
  });

  it('should return empty list if no fragment is provided', () => {
    expect(parseJPointer('http://foo.baz')).toEqual([]);
  });
});
