import { createBrowserRouter } from 'react-router-dom';

import MainPage from '../pages/Main';
import NotFoundPage from '../pages/NotFound';
import LoginPage from '../pages/Login';
import SignPage from '../pages/Sign/Sign';
import SignWithKakaoPage from '../pages/Sign/SignWithKakao';

export const ROUTER = createBrowserRouter(
  [
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
      children: [
        {
          path: 'kakao',
          element: <SignWithKakaoPage />,
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
