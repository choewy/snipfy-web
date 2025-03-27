import { createBrowserRouter } from 'react-router-dom';

import MainPage from '../pages/Main';
import NotFoundPage from '../pages/NotFound';
import LoginPage from '../pages/Login';
import SignPage from '../pages/Sign/Sign';
import { Layout } from '../common/Layout';

export const ROUTER = createBrowserRouter(
  [
    {
      element: <Layout />,
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
