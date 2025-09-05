import { ValueType } from './type';

export const getDefaultValueByType = (type: ValueType) => {
  if (type === 'object') {
    return {};
  } else if (type === 'array') {
    return [];
  } else if (type === 'boolean') {
    return false;
  } else if (type === 'number') {
    return 0;
  } else if (type === 'string') {
    return '';
  } else if (type === 'null') {
    return null;
  }
};