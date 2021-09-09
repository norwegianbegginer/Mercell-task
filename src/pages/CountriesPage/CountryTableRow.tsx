import React from 'react';
import { TableRow, TableCell, Avatar } from '@mui/material';
import { Country } from '../../types/countries';
import { sqKmToSqMi, formatPopulation } from '../../utils/helpers';

/**
 * CountryTableRow component that returns a row with country details.
 */
export function CountryTableRow({ country }: { country: Country }) {
  const { name, region } = country;

  const area =
    country.area !== null ? `${~~sqKmToSqMi(country.area)} mi` : `No data`;
  const population =
    country.population !== null
      ? `${formatPopulation(country.population)} mln`
      : `No data`;

  return (
    <TableRow key={name}>
      <TableCell width="64px" align="center">
        <Avatar>
          <img
            src={`https://www.countryflags.io/${country.alpha2Code}/flat/64.png`}
            alt={`${name} country flag`}
          />
        </Avatar>
      </TableCell>
      <TableCell width="25%">{name}</TableCell>
      <TableCell width="25%">{region}</TableCell>
      <TableCell width="25%">{area} </TableCell>
      <TableCell width="25%">{population}</TableCell>
    </TableRow>
  );
}
