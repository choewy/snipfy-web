import { createTheme } from '@mui/material';

export const DEFAULT_THEME = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: '#ffffff',
          backgroundColor: '#020617',
          borderColor: '#020617',
        },
        outlined: {
          color: '#334155',
          backgroundColor: '#ffffff',
          borderColor: '#e2e8f0',
        },
      },
    },
  },
});
