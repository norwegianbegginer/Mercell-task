import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

/**
 * Navbar components that contains project title.
 */
export function NavBar() {
  return (
    <AppBar
      position="relative"
      elevation={0}
      style={{
        backgroundColor: `transparent`,
        marginBottom: `26px`,
      }}
    >
      <Toolbar style={{ marginLeft: `250px` }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: `flex`, justifyContent: `center` }}
        >
          Mercell Countries
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
