import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TextField,
  Toolbar,
  TablePagination,
  Typography,
} from '@mui/material';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import {
  countriesNameSearchAtom,
  countriesSearchPaginated,
  countriesPageAtom,
  countriesSortAtom,
} from '../../store/countries';
import { Statistics } from './CountriesStatistics';
import { CountriesTableBody } from './CountriesTableBody';
import { CountriesTableHead } from './CountriesTableHead';

/** Abbreviation for Object.freeze. */
const frz = Object.freeze;

/**
 * Default columns to display in the table.
 */
export const columnTitles = frz([``, `Name`, `Region`, `Area`, `Population`]);

/**
 * CoutriesPage component.
 * @description This component is responsible for displaying the table of countries paginated.
 */
const CountriesPage = () => {
  const sort = useRecoilValue(countriesSortAtom);
  const page = useRecoilValue(countriesPageAtom);
  const setPage = useSetRecoilState(countriesPageAtom);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [nameSearch, setNameSearch] = useRecoilState(countriesNameSearchAtom);

  // Resets the page every time the searched name or sorting options change.
  useEffect(() => {
    setPage(0);
  }, [sort]);

  const { countries, totalEntries } = useRecoilValue(
    countriesSearchPaginated({ rowsPerPage }),
  );

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNameSearch: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setNameSearch(event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: `100%` }}>
      <Paper sx={{ width: `100%`, mb: 2, paddingTop: `12px` }}>
        <Toolbar
          style={{
            display: `flex`,
            justifyContent: `space-between`,
            marginBottom: `16px`,
          }}
        >
          <Box>
            <Typography variant="h4" style={{ paddingTop: `14px` }}>
              Countries
            </Typography>
            <Typography gutterBottom style={{ opacity: 0.6 }}>
              {totalEntries} entries
            </Typography>
          </Box>

          <TextField
            value={nameSearch}
            variant="filled"
            color="secondary"
            onChange={handleNameSearch}
            size="small"
            label="Search countries"
          />
        </Toolbar>
        <TableContainer sx={{ height: `70vh` }}>
          <Table stickyHeader>
            <CountriesTableHead />

            <CountriesTableBody countries={countries} />
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalEntries}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Statistics />
    </Box>
  );
};

export default CountriesPage;
