import {last} from '../utils/array';

export const getUuid = () =>  (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

export const singularize = word => word.replace(/s$/, '');

export const pluralize = (first, second) => {
  const number = typeof first === 'number' ? first : second;
  const word = typeof first === 'number' ? second : first;
  const pluralizedWords = word.split(/\s/).map(w => `${w}${number > 1 ? 's' : ''}`).join(' ');
  const displayedNumber = number || 'aucun';
  return `${number === first ? displayedNumber : ''} ${pluralizedWords}`.trim();
}

export const feminize = (word, isFeminine, feminineVersion) => {
  if (isFeminine && feminineVersion) return feminineVersion;
  return word.split(/\s/).map(w => `${w}${isFeminine !== undefined ? (isFeminine ? 'e' : '') : '·e'}`).join(' ');
}

export const capitalize = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const removeTags = str => {
  return str.replace(/\<.*?\>/g, '').replace(/\<\/.*?\>/g, '')
}

export const formatPhoneNumber = value => {
  const matches = ((value || '').replace(/[^0-9]/g, '').substring(0,10).match(/.{1,2}/g) || []);
  if ((last(matches) || []).length === 2) {
    matches.push('');
  }
  return matches.slice(0, 5).join(' ');
};

export const startsWith = (string, start) => string.indexOf(start) === 0;
export const startsWithNoCase = (string, start) => startsWith(string.toLowerCase(), start.toLowerCase());

export const prepend = (string, prefix) => (string ? `${prefix || ''}${string}` : string);

export const append = (string, suffix) => (string ? `${string}${prefix || ''}` : string);