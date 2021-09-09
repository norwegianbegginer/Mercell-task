import { selector, selectorFamily, atom } from 'recoil';
import { Country } from '../types/countries';
import { Languages } from '../types/languages';
import { countriesQuery } from './countries';
import { objectToArray } from '../utils/helpers';

/**
 * Returns list of languages with details.
 */
export const languagesList = selector({
  key: `languagesList`,
  get: ({ get }) => {
    const countries = get(countriesQuery);

    return countries.reduce((acc: Languages, c: Country) => {
      c.languages.forEach((l) => {
        if (!acc[l.name]) {
          acc[l.name] = { ...l, countries: [c], speakers: c.population };
        } else {
          acc[l.name].countries.push(c);
          acc[l.name].speakers += c.population;
        }
      });
      return acc;
    }, {} as Languages);
  },
});

/**
 * Atom that stores current page of languages table.
 */
export const languagesPageAtom = atom<number>({
  key: `languagesPageAtom`,
  default: 0,
});

/**
 * Atom that stores current search input value.
 */
export const languagesNameSearchAtom = atom<string>({
  key: `languagesNameSearchAtom`,
  default: ``,
});

/**
 *Returns paginated list of languages.
 */
export const languagesPaginated = selectorFamily({
  key: `LanguagesPaginated`,
  get:
    (props?: { rowsPerPage?: number }) =>
    async ({ get }) => {
      const languagesObj = get(languagesList);
      let languages = objectToArray(languagesObj).sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      const nameSearch = get(languagesNameSearchAtom);

      // To avoid iteration when no query is provided.
      if (nameSearch.trim()) {
        languages = languages.filter((language) =>
          language.name.toLowerCase().includes(nameSearch.toLowerCase()),
        );
      }

      const page = get(languagesPageAtom) ?? 1;
      const rowsPerPage = props?.rowsPerPage ?? 10;

      return {
        totalEntries: languages.length,
        languages: languages.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      };
    },
});
