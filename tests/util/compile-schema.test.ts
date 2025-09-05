import { compileIf } from '@/util/compile-schema';
import { JSONSchema7 } from 'json-schema';

describe('compileIf', () => {
  it('should compile if #1', () => {
    const schema: JSONSchema7 = {
      if: { type: 'string' },
      then: { type: 'string' },
      else: { type: 'number' }
    };
    expect(compileIf(schema, 'test')).toEqual({ type: 'string' });
    expect(compileIf(schema, true)).toEqual({ type: 'number' });
  });

  it('should compile if #2', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          enum: ['a', 'b']
        },
        b: {
          type: 'string',
          enum: ['c', 'd']
        }
      },
      if: { properties: { a: { const: 'a' } } },
      then: { properties: { b: { enum: ['cc', 'dd'] } } }
    };

    expect(compileIf(schema, { a: 'a' })).toEqual({
      type: 'object',
      properties: {
        a: {
          type: 'string',
          enum: ['a', 'b']
        },
        b: {
          type: 'string',
          enum: ['cc', 'dd']
        }
      } 
    });

    expect(compileIf(schema, { a: 'b' })).toEqual({
      type: 'object',
      properties: {
        a: {
          type: 'string',
          enum: ['a', 'b']
        },
        b: {
          type: 'string',
          enum: ['c', 'd']
        }
      } 
    });
  });

  it('should compile if #3', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          enum: ['a', 'b']
        },
        b: {
          type: 'string',
          enum: ['c', 'd']
        }
      },
      if: { properties: { a: { const: 'a' } } },
      then: { properties: { b: { enum: ['cc', 'dd'] } } },
      else: {
        if: { properties: { a: { const: 'b' } } },
        then: { properties: { b: { enum: ['ee', 'ff'] } } }
      }
    };
    
    expect(compileIf(schema, { a: 'a' })).toEqual({
      type: 'object',
      properties: {
        a: {
          type: 'string',
          enum: ['a', 'b']
        },
        b: {
          type: 'string',
          enum: ['cc', 'dd']
        }
      } 
    });

    expect(compileIf(schema, { a: 'b' })).toEqual({
      type: 'object',
      properties: {
        a: {
          type: 'string',
          enum: ['a', 'b']
        },
        b: {
          type: 'string',
          enum: ['ee', 'ff']
        }
      } 
    });
  });
});