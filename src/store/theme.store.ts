import { createTheme } from '@mui/material';

import { atom, useRecoilValue } from 'recoil';

export const themeStore = atom({
  key: 'theme',
  default: {
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: 'class',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  },
});

export const useTheme = () => {
  const theme = useRecoilValue(themeStore);

  return createTheme(theme);
};
