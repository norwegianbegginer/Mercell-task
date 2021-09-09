import React from 'react';
import { TableRow, TableHead } from '@mui/material';
import { CountriesTableHeadCell } from './CountriesTableHeadCell';
import { columnTitles } from './index';

/**
 * CountriesTableHead component.
 * @description This component is responsible for displaying the table head.
 */
export function CountriesTableHead() {
  return (
    <TableHead>
      <TableRow>
        {columnTitles.map((t) => (
          <CountriesTableHeadCell
            key={t}
            name={t}
            value={t.toLowerCase() as any}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}
