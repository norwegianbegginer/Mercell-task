/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { selector, atom, selectorFamily } from 'recoil';
import { TSortOptions } from '../types/api';
import { fetchCountries } from '../api/methods';
import { Country } from '../types/countries';
import { parseCountries } from '../utils/helpers';

/**
 * Atom that stores current countries list sort value.
 */
export const countriesSortAtom = atom<TSortOptions>({
  key: `countriesSortAtom`,
  default: `name-ascending`,
});

/**
 * Atom that stores current search input value.
 */
export const countriesNameSearchAtom = atom<string>({
  key: `countriesNameSearchAtom`,
  default: ``,
});

/**
 * Atom that stores current countries table page value.
 */
export const countriesPageAtom = atom<number>({
  key: `countriesPageAtom`,
  default: 0,
});

/**
 * Reruns the Countries selector which refetches the countries from the server.
 * @see useRefreshCountries for the utility hook wrapping the logic.
 */
export const refreshCountries = atom<number>({
  key: `refreshCountries`,
  default: 0,
});

/**
 * Returns list of countries.
 */
export const countriesQuery = selector({
  key: `Countries`,
  get: async ({ get }) => {
    get(refreshCountries);
    return parseCountries(await fetchCountries());
  },
});

/**
 * Returns searched country if exists.
 */
export const countriesSearch = selector({
  key: `CountriesSearch`,
  get: async ({ get }) => {
    let countries = [...get(countriesQuery)];
    const sort = get(countriesSortAtom);
    const nameSearch = get(countriesNameSearchAtom);

    // To avoid iteration when no query is provided.
    if (nameSearch.trim()) {
      countries = countries.filter((country) =>
        country.name.toLowerCase().includes(nameSearch.toLowerCase()),
      );
    }

    // Return the sorted categories.
    return countries.sort((a, b) => {
      switch (sort) {
        default:
        case `name-ascending`:
          return a.name.localeCompare(b.name);
        case `name-descending`:
          return b.name.localeCompare(a.name);
        case `population-ascending`:
          return a.population - b.population;
        case `population-descending`:
          return b.population - a.population;
        case `area-ascending`:
          return a.area - b.area;
        case `area-descending`:
          return b.area - a.area;
      }
    });
  },
});

/**
 * Returns paginated list of countires.
 */
export const countriesSearchPaginated = selectorFamily({
  key: `CountriesSearchPaginated`,
  get:
    (props?: { rowsPerPage?: number }) =>
    async ({ get }) => {
      const countries = [...get(countriesSearch)];
      const page = get(countriesPageAtom) ?? 1;
      const rowsPerPage = props?.rowsPerPage ?? 10;

      return {
        totalEntries: countries.length,
        countries: countries.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      };
    },
});

/**
 * Returns average populations of all fetched countries.
 */
export const countriesAveragePopulation = selector({
  key: `AveragePopulation`,
  get: async ({ get }) => {
    const countries = get(countriesQuery);

    return ~~(
      countries.reduce((acc: number, c: Country) => acc + c.population, 0) /
      countries.length
    );
  },
});

/**
 * Returns list of countries sorted by given property and direction.
 */
export const countryWithDirectionByProperty = selectorFamily({
  key: `CountriesWithDirectionByProperty`,
  get:
    ({
      property,
      direction,
    }: {
      direction: 'biggest' | 'smallest';
      property: 'population' | 'area';
    }) =>
    async ({ get }: any) => {
      const countries = [...get(countriesQuery)];

      let searchedCountry: Country | null = null;

      for (const country of countries) {
        const value: any = searchedCountry?.[property] ?? -1;

        if (country.area !== null) {
          if (value === -1) {
            searchedCountry = country;
          } else if (direction === `biggest`) {
            if (country[property] >= value) {
              searchedCountry = country;
            }
          } else if (country[property] <= value) {
            searchedCountry = country;
          }
        }
      }

      return searchedCountry;
    },
});
