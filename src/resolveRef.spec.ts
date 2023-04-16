import { resolveRef } from './resolveRef';

describe('resolveRef', () => {
  it('should substitute JSON addressed by URI in place of "$ref" declared inside object', async () => {
    const constResolver = () => ({
      some: { remote: 'json' }
    });

    const result = await resolveRef(
      {
        foo: {
          bar: { $ref: 'http://some-remote.json' },
          baz: [123]
        }
      },
      constResolver
    );

    expect(result).toEqual({
      foo: {
        bar: { some: { remote: 'json' } },
        baz: [123]
      }
    });
  });

  it('should substitute JSON addressed by URI in place of "$ref" declared inside list', async () => {
    const constResolver = () => ({
      some: { remote: 'json' }
    });

    const result = await resolveRef(
      {
        foo: {
          bar: 0,
          baz: [123, { $ref: 'http://some-remote.json' }, 456]
        }
      },
      constResolver
    );

    expect(result).toEqual({
      foo: {
        bar: 0,
        baz: [123, { some: { remote: 'json' } }, 456]
      }
    });
  });

  it('should substitute JSON addressed by URI in place of "$ref" with regard to URI fragment', async () => {
    const constResolver = () => ({
      some: { remote: 'json' }
    });

    const result = await resolveRef(
      {
        foo: {
          bar: { $ref: 'http://some-remote.json#/some/remote' },
          baz: [123]
        }
      },
      constResolver
    );

    expect(result).toEqual({
      foo: {
        bar: 'json',
        baz: [123]
      }
    });
  });

  it('should "ask" URIResolver to resolve URI for each "$ref"', async () => {
    expect.assertions(2);

    const resolver = jest.fn();

    const result = await resolveRef(
      {
        foo: {
          bar: { $ref: 'http://some-remote.json#/first' },
          baz: [123, { $ref: 'http://some-remote.json#/second' }, 456]
        }
      },
      resolver
    );

    expect(resolver).toBeCalledWith('http://some-remote.json#/first');
    expect(resolver).toBeCalledWith('http://some-remote.json#/second');
  });
});