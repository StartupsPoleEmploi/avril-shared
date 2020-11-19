import {isBlank} from './boolean.js';

export const countyWithNumber = result => {
  const county = (result.county || [])[0]
  if (result.country_code === 'fr') {
    const countyNb = parseInt(((result.postcode || [])[0] || '').substring(0, 2));
    return `${county} (${countyNb})`;
  }
  return county;
}

export const algoliaToAddress = (type, result) => {
  if (!result) return;
  if (type == 'address') {
    return {
      street: result.locale_names[0],
      city: (result.city || [])[0],
      postalCode: (result.postcode || [])[0],
      country: result.country,
      lat: result._geoloc.lat,
      lng: result._geoloc.lng,
    }
  } else if (type == 'country') {
    return {
      country: result.locale_names[0],
      countryCode: result.country_code.toUpperCase(),
    }
  } else {
    return {
      administrative: (result.administrative || [])[0],
      city: result.locale_names[0],
      county: countyWithNumber(result),
      country: result.country,
      countryCode: result.country_code,
      lat: result._geoloc.lat,
      lng: result._geoloc.lng,
      postalCode: (result.postcode || [])[0],
    }
  }
}

export const addressLabelify = address => {
  if (isBlank(address)) return null;
  if (typeof address === 'string') return address;
  if (address.street) return `${address.street}\n ${address.postalCode} ${address.city}, ${address.country}`;
  if (address.county) return `${address.city}, ${address.county}, ${address.country}`;
  if (address.city && address.country) return `${address.city}, ${address.country}`;
  if (address.city) return `${address.city}`;
  return `${address.country} (${address.countryCode})`
}
