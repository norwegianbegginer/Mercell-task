import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import {
  countryWithDirectionByProperty,
  countriesAveragePopulation,
} from '../../store/countries';
import { StatisticCard } from './CountryStatisticCard';

/**
 * Recoil selector for the smallest country.
 */
const smallestCountrySelector = countryWithDirectionByProperty({
  direction: `smallest`,
  property: `area`,
});

/**
 * Recoil selector for the biggest country.
 */
const biggestCountrySelector = countryWithDirectionByProperty({
  direction: `biggest`,
  property: `area`,
});

/**
 * Statistics component.
 * @description This component is responsible for displaying the statistics (biggest/smallest/average country in terms of area and population).
 */
export const Statistics = () => {
  const smallestCountry = useRecoilValue(smallestCountrySelector);
  const biggestCountry = useRecoilValue(biggestCountrySelector);
  const averagePopulation = useRecoilValue(countriesAveragePopulation);

  return (
    <Box marginY="60px">
      <Typography variant="h4" gutterBottom>
        Statistics
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {smallestCountry && (
          <StatisticCard
            label="Smallest country"
            value={smallestCountry.name}
          />
        )}
        {biggestCountry && (
          <StatisticCard label="Biggest country" value={biggestCountry.name} />
        )}
        {averagePopulation && (
          <StatisticCard
            label="Average population"
            value={averagePopulation
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, `.`)}
          />
        )}
      </Box>
    </Box>
  );
};
