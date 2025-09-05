import { JSONSchema7 } from 'json-schema';
import { merge } from 'lodash';
import Ajv from 'ajv';
export const compileSchema = (schema: JSONSchema7, data: any) => {
  const _schema = compileIf(schema, data);
  // _schema = compileAllOf(_schema, data);
  // _schema = compileOneOf(_schema, data);
  // _schema = compileAnyOf(_schema, data);
  return _schema;
};


export const compileIf = (schema: JSONSchema7, data: any): JSONSchema7 => {
  const {
    if: ifSchema, then: thenSchema, else: elseSchema, ...otherSchema 
  } = schema;

  if (ifSchema) {
    let result = otherSchema;
    const mergeSchema1 = merge({}, otherSchema, ifSchema);
    if (thenSchema) {
      const mergeSchema = merge({}, otherSchema, ifSchema, thenSchema);
      if (validate(mergeSchema, data) || validate(mergeSchema1, data)) {
        result = merge({}, otherSchema, thenSchema);
      } else {
        if (elseSchema) {
          const mergeSchema = merge({}, otherSchema, ifSchema, elseSchema);
          if (validate(mergeSchema, data) || !validate(mergeSchema1, data)) {
            result = merge({}, otherSchema, elseSchema);
          }
        }
      }
    } 
    
    return compileIf(result, data);
  }
  return otherSchema;
};

export const compileAllOf = (schema: JSONSchema7, data: any): JSONSchema7 => {
  const { allOf, ...otherSchema } = schema;

  if (Array.isArray(allOf)) {
    
  } 
  return otherSchema;
};

export const compileOneOf = (schema: JSONSchema7, data: any): JSONSchema7 => {
  const { oneOf, ...otherSchema } = schema;

  if (Array.isArray(oneOf)) {
    
  } 
  return otherSchema;
};

export const compileAnyOf = (schema: JSONSchema7, data: any): JSONSchema7 => {
  const { anyOf, ...otherSchema } = schema;

  if (Array.isArray(anyOf)) {
    
  } 
  return otherSchema;
};

export const validate = (schema: JSONSchema7, data: any):boolean => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return validate(data);
};