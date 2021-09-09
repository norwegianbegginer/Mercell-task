import { Country } from '../types/countries';

/**
 * Convert square kilometers to square miles.
 * @param {number} squareKilometers
 * @returns {number} - The square miles.
 * @example
 * squareKilometersToSquareMiles(1); // 0.386102
 */
export const sqKmToSqMi = (sqKm: number) => sqKm * 0.386102;

/**
 * Format the population in millions with one decimal.
 * @param population The population number to format.
 * @returns The formatted population.
 * @example
 * formatPopulation(1000000); // 1.0
 * formatPopulation(10000000); // 10.0
 * formatPopulation(100000000); // 100.0
 */
export const formatPopulation = (population: number) =>
  (Math.round((population / 1000000) * 10) / 10).toFixed(1);

/**
 * Convert hext o RGBA.
 * @param hex The hexadecimal color to convert.
 * @param alpha The alpha value to use.
 * @returns The RGBA color.
 * @example
 * hexToRgba('#FF0000', 0.5); // rgba(255, 0, 0, 0.5)
 * hexToRgba('#FF0000', 1); // rgba(255, 0, 0, 1)
 * hexToRgba('#FF0000', 0); // rgba(255, 0, 0, 0)
 * hexToRgba('#FF0000'); // rgba(255, 0, 0, 1)
 * hexToRgba('#FF0000', 0.5); // rgba(255, 0, 0, 0.5)
 */
export function hexToRgbA(hex: string, alpha = 1) {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split(``);
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join(``)}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      `,`,
    )},${alpha})`;
  }
  throw new Error(`Bad Hex provided.`);
}

/**
 * Converts an object to array.
 * @param obj Object to convert
 * @example
 * objectToArray({ a: 1, b: 2 }); // [ 1, 2 ]
 */
export const objectToArray = <T, R extends keyof T>(obj: T): T[R][] =>
  Object.keys(obj).map((key) => obj[key as unknown as R]);

objectToArray({ a: 1, b: 2, c: `string`, d: true });
objectToArray(`dupa`);

/**
 * Function that returns a copy of Country[].
 */
export const parseCountries = (data: any): Country[] => {
  // eslint-disable-next-line no-console
  console.info(`📁`, `Countries =>`, data);

  return [...(data ?? [])] as Country[];
};
