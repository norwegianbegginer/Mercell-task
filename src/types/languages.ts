import { Country } from './countries';

export interface Language {
  countries: Country[];
  speakers: number;
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}
export type Languages = { [key: string]: Language };
