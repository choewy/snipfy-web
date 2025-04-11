import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { snipfyApiService } from '../../api/snipfy/snipfy-api.service';
import { NotiStackEvent } from '../../persistents/events/noti-stack.event';
import { snipfyCookieService } from '../../api/snipfy/snipfy-cookie.service';

export default function SignPage() {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const authKey = searchParams.get('authKey');

  const handleSign = async () => {
    if (!authKey) {
      return navigate('/login', { replace: true });
    }

    const { data, error } = await snipfyApiService.getSignToken(authKey);

    if (error) {
      if (typeof error.statusCode === 'number') {
        NotiStackEvent.warning('인증 토큰 발급에 실패하였습니다.');
      } else {
        NotiStackEvent.error(error.message);
      }

      return navigate('/login', { replace: true });
    }

    snipfyCookieService.setTokens(data.accessToken, data.refreshToken);
  };

  useEffect(() => {
    handleSign();
  }, [authKey, navigate]);

  return <></>;
}
