export const _deepClone = function (obj: any) {
  if (obj == null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof String) {
    return new String(obj);
  }
  if (obj instanceof Number) {
    return new Number(obj);
  }
  if (obj instanceof Boolean) {
    return new Boolean(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // обрабатывать другие объекты, если требуется

  let clone: any = {};
  if (obj instanceof Array) {
    clone = new Array(obj.length);
  }

  for (const key in obj) {
    clone[key] = _deepClone(obj[key]);
  }

  return clone;
};
