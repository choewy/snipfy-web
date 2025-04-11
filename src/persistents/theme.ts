import { createTheme } from '@mui/material';

export const COLORS = ['#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#020617'];

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
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderStyle: 'solid',
          '& .MuiOutlinedInput-root input': {
            borderWidth: 0,
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#64748b',
            borderWidth: 1,
          },
          '& .MuiOutlinedInput-input': {
            color: '#475569',
          },
        },
      },
    },
  },
});
