import React from 'react';
import { Box, Icon, TableCell, styled } from '@mui/material';
import { useRecoilState } from 'recoil';
import { TSortOptions } from '../../types/api';
import { countriesSortAtom } from '../../store/countries';

/**
 * The cells that should be omitted from sorting.
 */
const omittedSortOptions = Object.freeze([`region`]);

const CountriesTableHeadCellStyled = styled(TableCell)`
  cursor: pointer;
  user-select: none;
`;
/**
 * CountriesTableHeadCell component that returns countries table head cell.
 */
export const CountriesTableHeadCell = ({
  name,
  value,
}: {
  name: string;
  value: 'name' | 'region' | 'area' | 'population';
}) => {
  const [sort, setSort] = useRecoilState(countriesSortAtom);

  const ascending = sort === `${value}-ascending`;
  const sortIcon = ascending ? `arrow_drop_up` : `arrow_drop_down`;
  const isSorted = value === sort.split(`-`)[0];

  const handleSort = () => {
    // Ommit value from sorting if it is restricted or empty.
    if (!value || omittedSortOptions.indexOf(value) > -1) {
      return;
    }
    const direction = !ascending ? `ascending` : `descending`;
    setSort(`${value}-${direction}` as TSortOptions);
  };

  return (
    <CountriesTableHeadCellStyled onClick={handleSort}>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        {name}
        <Box
          display="flex"
          flexDirection="column"
          style={{ opacity: isSorted ? 1 : 0 }}
        >
          <Icon>{sortIcon}</Icon>
        </Box>
      </Box>
    </CountriesTableHeadCellStyled>
  );
};
