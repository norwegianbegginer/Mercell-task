import React from 'react';
import { Typography, Card, styled } from '@mui/material';

/**
 * Styles for the root Card component.
 */
const EnhancedStatisticCard = styled(Card)`
  padding: 20px;
  flex: 1;
  margin: 15px 20px 15px 0;
  min-width: 265;
`;

/**
 * StatisticsCard component.
 * @description This component is used to display a single statistic.
 */
export const StatisticCard = ({ value, label }: CountryStatisticCardProps) => (
  <EnhancedStatisticCard>
    <Typography variant="h5" gutterBottom>
      {value}
    </Typography>
    <Typography style={{ opacity: 0.8 }}>{label}</Typography>
  </EnhancedStatisticCard>
);
type CountryStatisticCardProps = {
  value: string;
  label: string;
};
