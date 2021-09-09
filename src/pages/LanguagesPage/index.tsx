import React from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  TablePagination,
  Toolbar,
  Typography,
  TextField,
} from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  languagesPaginated,
  languagesPageAtom,
  languagesNameSearchAtom,
} from '../../store/languages';
import { LanguagesTableRow } from './LanguagesTableRow';
import { Language } from '../../types/languages';

const frz = Object.freeze;

const columnTitles = frz([`Language`, `Countries`, `Population`]);

/**
 * LanguagesPage component.
 * @description Renders the Languages page.
 */
const LanguagesPage = () => {
  const [nameSearch, setNameSearch] = useRecoilState(languagesNameSearchAtom);
  const [page, setPage] = useRecoilState(languagesPageAtom);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { languages, totalEntries } = useRecoilValue(
    languagesPaginated({ rowsPerPage }),
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
              Languages
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
            label="Search languages"
          />
        </Toolbar>
        <TableContainer sx={{ maxHeight: `70vh` }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columnTitles.map((t) => (
                  <TableCell key={t}>{t}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {languages.map((language: Language) => (
                <LanguagesTableRow
                  key={language.name}
                  name={language.name}
                  countries={language.countries}
                  speakers={language.speakers}
                />
              ))}
            </TableBody>
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
    </Box>
  );
};

export default LanguagesPage;
