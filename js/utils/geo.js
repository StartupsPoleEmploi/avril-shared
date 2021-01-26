import {isBlank} from './boolean.js';

export const geoTypeToBanType = geoType => {
  const MAP = {
    city: 'municipality',
    address: 'housenumber',
  }
  return MAP[geoType];
}

export const countyWithNumber = result => {
  const county = (result.county || [])[0]
  if (result.country_code === 'fr') {
    const countyNb = parseInt(((result.postcode || [])[0] || '').substring(0, 2));
    return `${county} (${countyNb})`;
  }
  return county;
}

export const countyAndAdministrative = result => {
  const [countyNb, county, administrative] = result.properties.context.split(', ');
  return {
    county: `${county} (${countyNb})`,
    administrative,
  }
}

export const banToAddress = (type, result) => {
  if (!result || (geoTypeToBanType(type) !== result.properties.type)) return;
  if (type === 'city') {
    return {
      ...countyAndAdministrative(result),
      city: result.properties.city,
      postalCode: result.properties.postcode,
      country: 'France',
      countryCode: 'FR',
      lat: result.geometry.coordinates[1],
      lng: result.geometry.coordinates[0],
    }
  }
  return {
    street: result.properties.name,
    city: result.properties.city,
    postalCode: result.properties.postcode,
    country: 'France',
    countryCode: 'FR',
    lat: result.geometry.coordinates[1],
    lng: result.geometry.coordinates[0],
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
