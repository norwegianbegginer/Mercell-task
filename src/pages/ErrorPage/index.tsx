import React from 'react';
import { Container, Typography } from '@mui/material';

const ErrorPage = ({ message }: { message: string | null }) => (
  <Container>
    <Typography variant="h2">An unexpected error occurred!</Typography>
    {message && <Typography>{message}</Typography>}
  </Container>
);

export default ErrorPage;
