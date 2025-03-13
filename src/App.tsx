import KakaoPage from './pages/Auth/Kakao';

import { LINK_FORCE_API_URL } from './persistent/config';

function App() {
  const handleClickKakaoLogin = () => {
    const href = window.location.href;
    const [protocol, url] = href.split('://');
    const state = `${protocol}://${url.split('/').shift()}/auth/kakao`;

    window.location.href = `${LINK_FORCE_API_URL}/auth/kakao?state=${state}`;
  };

  return (
    <div>
      <button onClick={handleClickKakaoLogin}>카카오 로그인</button>
      <KakaoPage />
    </div>
  );
}

export default App;
