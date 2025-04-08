import { create } from 'zustand';
import { createTheme, ThemeOptions, Theme } from '@mui/material';

const DEFAULT_THEME_OPTIONS: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#ff5252',
      light: '#ff5252',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff5252',
      light: '#ff5252',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#000000',
    },
    divider: '#000000',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
        contained: {
          color: '#ff5252',
          backgroundColor: '#ffffff',
        },
        outlined: {
          color: '#ffffff',
          borderColor: '#ffffff',
        },
        text: {
          color: '#ffffff',
        },
      },
    },
  },
};

export const useThemeStore = create<{
  theme: Theme;
  set: (themeOptions: ThemeOptions) => void;
}>((set) => ({
  theme: createTheme(DEFAULT_THEME_OPTIONS),
  set: (themeOptions: ThemeOptions) => set({ theme: createTheme(themeOptions) }),
}));
