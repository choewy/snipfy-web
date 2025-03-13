import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { setCookie } from '../../persistent/cookie';
import { CookieKey } from '../../persistent/enums';

export default function KakaoPage() {
  const getTokens = useCallback(async (code: string) => {
    const { data } = await axios.post('http://192.168.0.19:4000/auth/token', { code });

    setCookie(CookieKey.AccessToken, data.accessToken);
    setCookie(CookieKey.RefreshToken, data.refreshToken);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      getTokens(code);
    }
  }, [getTokens]);

  return <div></div>;
}
