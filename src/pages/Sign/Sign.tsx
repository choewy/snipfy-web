import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignApi } from '../../api/SignApi';
import { setCookie } from '../../persistent/cookie';
import { CookieKey } from '../../persistent/enums';

export default function SignPage() {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const authKey = searchParams.get('authKey');

  const sign = useCallback(async () => {
    if (!authKey) {
      return navigate('/login', { replace: true });
    }

    await SignApi.getToken(authKey).then((response) => {
      const accessToken = response.data?.data?.accessToken;
      const refreshToken = response.data?.data?.accessToken;

      setCookie(CookieKey.AccessToken, accessToken);
      setCookie(CookieKey.RefreshToken, refreshToken);

      navigate('/', { replace: true });
    });
  }, [navigate, authKey]);

  useEffect(() => {
    sign();
  }, [sign]);

  return <></>;
}
