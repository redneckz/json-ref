import { visitRef } from './visitRef';

describe('visitRef', () => {
  it('should visit all "$ref" fields', async () => {
    const visitor = jest.fn();

    visitRef(
      {
        foo: {
          bar: { $ref: 'http://some-remote.json' },
          baz: [{ $ref: '#foo' }]
        }
      },
      visitor
    );

    expect(visitor).toBeCalledWith('http://some-remote.json', ['foo', 'bar']);
    expect(visitor).toBeCalledWith('#foo', ['foo', 'baz', 0]);
  });
});
