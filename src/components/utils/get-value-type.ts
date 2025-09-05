export const getValueType = (value: any) => {
  const type = typeof value;
  if (type === 'object') {
    if (Array.isArray(value)) {
      return 'array';
    } else if (value === null) {
      return 'null';
    } else {
      return 'object';
    }
  } else {
    return type;
  }
};