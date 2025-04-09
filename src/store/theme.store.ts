import { create } from 'zustand';
import { createTheme, ThemeOptions, Theme } from '@mui/material';

export const MAIN_COLOR = '#1F3731';
export const REVERSE_COLOR = '#f5f5f5';

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
      main: MAIN_COLOR,
      contrastText: REVERSE_COLOR,
    },
    secondary: {
      main: MAIN_COLOR,
      contrastText: REVERSE_COLOR,
    },
    background: {
      default: REVERSE_COLOR,
      paper: REVERSE_COLOR,
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
          color: REVERSE_COLOR,
        },
        contained: {
          color: MAIN_COLOR,
          backgroundColor: REVERSE_COLOR,
        },
        outlined: {
          color: REVERSE_COLOR,
          borderColor: REVERSE_COLOR,
        },
        text: {
          color: REVERSE_COLOR,
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
