import { resolveRef } from './resolveRef';

describe('resolveRef', () => {
  it('should inline JSON addressed by URI in place of "$ref" declared inside object', async () => {
    const constResolver = () => ({
      some: { remote: 'json' }
    });

    const result = await resolveRef(
      {
        foo: {
          bar: { $ref: 'some/remote/json' },
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

  it('should inline json addressed by URI in place of "$ref" declared inside list', async () => {
    const constResolver = () => ({
      some: { remote: 'json' }
    });

    const result = await resolveRef(
      {
        foo: {
          bar: 0,
          baz: [123, { $ref: 'some/remote/json' }, 456]
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
});
