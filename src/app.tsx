import { RouterProvider } from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { ROUTER } from './router';
import { useThemeStore } from './store/theme.store';

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={ROUTER} />
    </ThemeProvider>
  );
}

export default App;
