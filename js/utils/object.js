import {include} from './array.js';
import {isObject, isBlank} from './boolean.js';

/*Object.fromEntries = Object.fromEntries || l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {});
*/
export const getKeysDeep = object => {
  return Object.entries(object).flatMap(([k, v]) => {
    if (isObject(v)) {
      const subKeys = getKeysDeep(v);
      return subKeys.map(k2 => `${k}.${k2}`);
    } else {
      return k;
    }
  });
}

export const exceptKeys = (object, keys) => Object.fromEntries(Object.entries(object).filter(([k, v]) => !include([].concat(keys), k)))

export const rejectBlankValues = object => Object.fromEntries(Object.entries(object).filter(([k, v]) => !isBlank(v)))

export const deepMerge = (...objects) => {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      }
      else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMerge(pVal, oVal);
      }
      else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

export const partition = (object, func) => {
  return Object.keys(object).reduce((results, k) => {
    const partitionKey = func(object[k], k).toString();
    return {
      ...results,
      ...{[partitionKey]: {
        ...(results[partitionKey] || {}),
        ...{[k]: object[k]}
      }}
    }
  }, {})
}