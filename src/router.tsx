import { createBrowserRouter, Outlet } from 'react-router-dom';

import App from './app';
import LoginPage from './pages/Login';
import SignPage from './pages/Sign/Sign';
import HomePage from './pages/home/home.page';
import NotFoundPage from './pages/not-found/not-found.page';

export const ROUTER = createBrowserRouter(
  [
    {
      path: '',
      element: <HomePage />,
    },
    {
      element: (
        <div>
          <div>LAYOUT</div>
          <div>
            <Outlet />
          </div>
        </div>
      ),
      children: [
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
