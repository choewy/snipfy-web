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
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: '#FFFFFF',
          backgroundColor: '#020617',
          borderColor: '#020617',
        },
        outlined: {
          color: '#334155',
          backgroundColor: '#FFFFFF',
          borderColor: '#E2E8F0',
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
