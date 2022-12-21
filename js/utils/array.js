export const first = array => {
  return array[0];
};
export const last = array => {
  return array[array.length - 1];
};
export const chunk = (array, perChunk) => {
  return array.reduce((result, elem, i) => {
     const ch = Math.floor(i/perChunk);
     result[ch] = [].concat((result[ch]||[]), elem);
     return result;
  }, []);
};
export const include = (array, elem) => {
  return array.indexOf(elem) > -1;
}

export const deduce = (array, otherArray) => {
  return array.filter(v => !otherArray.includes(v));
}