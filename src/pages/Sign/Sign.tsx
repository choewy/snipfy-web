import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { snipfyCookie } from '../../core/cookie/snipfy-cookie';
import { snipfySignApiService } from '../../api/snipfy/snipfy-api.service';

export default function SignPage() {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const authKey = searchParams.get('authKey');

  const sign = useCallback(async () => {
    if (!authKey) {
      return navigate('/login', { replace: true });
    }

    const getSignTokenResult = await snipfySignApiService.getSignToken(authKey);

    if (!getSignTokenResult.ok) {
      // TODO
      throw new Error('인증 토큰 요청 실패');
    }

    snipfyCookie.setTokens(getSignTokenResult.data.accessToken, getSignTokenResult.data.refreshToken);

    navigate('/', { replace: true });
  }, [navigate, authKey]);

  useEffect(() => {
    sign();
  }, [sign]);

  return <></>;
}
