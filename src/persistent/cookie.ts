import Cookies from 'universal-cookie';

import { CookieKey } from './enums';

export const cookies = new Cookies();

export const setCookie = (key: CookieKey, value: string) => {
  cookies.set(key, value, { path: '/' });
};

export const getCookie = (key: string): string | null => {
  return cookies.get(key) ?? null;
};

export const deleteCookie = (key: CookieKey) => {
  cookies.remove(key, { path: '/' });
};
