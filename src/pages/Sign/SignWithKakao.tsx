import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { setCookie } from '../../persistent/cookie';
import { CookieKey } from '../../persistent/enums';
import { SignApi } from '../../api/SignApi';

export default function SignWithKakaoPage() {
  const navigate = useNavigate();

  const getTokens = useCallback(
    async (authKey: string) => {
      try {
        const { data } = await SignApi.getToken(authKey);

        setCookie(CookieKey.AccessToken, data.accessToken);
        setCookie(CookieKey.RefreshToken, data.refreshToken);

        navigate('/', { replace: true });
      } catch (e) {}
    },
    [navigate],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authKey = searchParams.get('authKey');

    if (authKey) {
      getTokens(authKey);
    }
  }, [getTokens]);

  return <></>;
}
