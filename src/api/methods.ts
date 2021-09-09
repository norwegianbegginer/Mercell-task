import { Country } from '../types/countries';

/**
 * The url pointing to a list of countries.
 */
const COUNTRIES_URL = `https://restcountries.eu/rest/v2/all`;

/**
 * Function that fetches countries from the API. Returns a promise with Country[].
 */
export function fetchCountries(): Promise<Country[]> {
  return (
    fetch(COUNTRIES_URL)
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .catch(console.error)
  );
}
