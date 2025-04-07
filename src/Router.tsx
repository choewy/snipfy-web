import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import MainPage from './pages/Main';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import SignPage from './pages/Sign/Sign';

export const ROUTER = createBrowserRouter(
  [
    {
      element: <div>Landing Page</div>,
      path: '/landing',
    },
    {
      element: <App />,
      children: [
        {
          path: '',
          element: <MainPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'sign',
          element: <SignPage />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  },
);
