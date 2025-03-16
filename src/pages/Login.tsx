import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignApi } from '../api/SignApi';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleClickKakaoLogin = useCallback(async () => {
    try {
      const { data } = await SignApi.getSocialLoginPageURL();

      navigate(data.url, { replace: true });
    } catch (e) {}
  }, [navigate]);

  return (
    <div>
      <button onClick={handleClickKakaoLogin}>카카오 로그인</button>
    </div>
  );
}
