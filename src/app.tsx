import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { ROUTER } from './router';
import { DEFAULT_THEME } from './persistents/theme';

import Modal from './common/modal/modal';
import NotiStack from './common/notistack/notistack';

function App() {
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <CssBaseline />
      <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <NotiStack />
        <Modal />
        <RouterProvider router={ROUTER} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
