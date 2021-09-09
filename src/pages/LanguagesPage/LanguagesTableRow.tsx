import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableRow,
  TableCell,
  Chip,
} from '@mui/material';
import { Country } from '../../types/countries';
import { formatPopulation } from '../../utils/helpers';

/**
 * LanguagesTableRow component.
 * @description Renders a row in the Languages table.
 */
export const LanguagesTableRow = ({
  name,
  countries,
  speakers,
}: LanguagesTableRowProps) => (
  <TableRow>
    <TableCell width="33%">{name}</TableCell>
    <TableCell width="33%">
      <Accordion
        elevation={0}
        expanded={countries.length < 6 ? false : undefined}
      >
        <AccordionSummary
          style={{ cursor: countries.length < 6 ? `default` : `pointer` }}
        >
          {countries.slice(0, 5).map((c) => (
            <Chip
              key={c.name}
              style={{
                margin: 5,
                cursor: countries.length < 6 ? `default` : `pointer`,
              }}
              label={c.name}
              color="default"
              variant="outlined"
            />
          ))}

          {countries.length > 5 && (
            <Chip
              style={{
                margin: 5,
                cursor: `pointer`,
              }}
              label={`See ${countries.length - 6} more`}
              color="default"
              variant="filled"
            />
          )}
        </AccordionSummary>
        <AccordionDetails>
          {countries.map((c, i) =>
            i > 5 ? (
              <Chip
                key={c.name}
                style={{ margin: 5 }}
                label={c.name}
                color="default"
                variant="outlined"
              />
            ) : null,
          )}
        </AccordionDetails>
      </Accordion>
    </TableCell>
    <TableCell width="33%">{`${formatPopulation(speakers)} mln`}</TableCell>
  </TableRow>
);
type LanguagesTableRowProps = {
  name: string;
  countries: Country[];
  speakers: number;
};
