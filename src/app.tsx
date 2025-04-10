import { RouterProvider } from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { ROUTER } from './router';
import { useThemeStore } from './store/theme.store';

import Modal from './common/modal/modal';

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={ROUTER} />
      <Modal />
    </ThemeProvider>
  );
}

export default App;
