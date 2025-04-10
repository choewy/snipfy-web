import { createBrowserRouter } from 'react-router-dom';

import Layout from './common/layout/layout';
import LoginPage from './pages/Login';
import SignPage from './pages/Sign/Sign';
import HomePage from './pages/home/home.page';
import NotFoundPage from './pages/not-found/not-found.page';

export const ROUTER = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '',
          element: <HomePage />,
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
