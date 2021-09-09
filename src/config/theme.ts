import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: `#ffffff`,
    },
    secondary: {
      main: `#6046A4`,
    },
    background: {
      default: `#FAFAFA`,
      paper: `#FFFFFF`,
    },
  },
  typography: {
    fontFamily: `Roboto`,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: `16px`,
        },
      },
    },
  },
});
