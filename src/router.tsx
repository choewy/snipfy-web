import { createBrowserRouter } from 'react-router-dom';

import Layout from './common/layout/layout';
import HomePage from './pages/home/home.page';
import NotFoundPage from './pages/not-found/not-found.page';
import LoginPage from './pages/login/login.page';
import RegisterPage from './pages/register/register.page';
import SignPage from './pages/sign/sign.page';

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
          path: 'register',
          element: <RegisterPage />,
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
