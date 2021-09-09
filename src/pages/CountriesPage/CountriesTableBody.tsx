import React from 'react';
import { TableBody } from '@mui/material';
import { CountryTableRow } from './CountryTableRow';
import { Country } from '../../types/countries';

/**
 * CountriesTableBody component.
 * @description This component is responsible for displaying the table body.
 */
export function CountriesTableBody({ countries }: { countries: Country[] }) {
  return (
    <TableBody>
      {countries.map((country) => (
        <CountryTableRow key={country.name} country={country} />
      ))}
    </TableBody>
  );
}
