import React from 'react';
import { Box, CircularProgress, styled } from '@mui/material';

const EnhancedBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FallbackPage = () => (
  <EnhancedBox>
    <CircularProgress color="secondary" thickness={5} />
  </EnhancedBox>
);

export default FallbackPage;
