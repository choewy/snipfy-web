import axios from 'axios';

import { LINK_FORCE_API_URL } from './config';
import { getCookie, setCookie } from './cookie';
import { CookieKey } from './enums';

const api = axios.create({ baseURL: LINK_FORCE_API_URL });

api.interceptors.request.use((config) => {
  const accessToken = getCookie(CookieKey.AccessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  const refreshToken = getCookie(CookieKey.RefreshToken);

  if (refreshToken) {
    config.headers['x-refresh-token'] = refreshToken;
  }

  return config;
});

api.interceptors.response.use((response) => {
  const accessToken = response.headers['x-access-token'];
  const refreshToken = response.headers['x-refresh-token'];

  if (accessToken && refreshToken) {
    setCookie(CookieKey.AccessToken, accessToken);
    setCookie(CookieKey.RefreshToken, refreshToken);
  }

  return response;
});

export { api };
