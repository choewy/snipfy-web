export default function LoginPage() {
  const handleClickKakaoLogin = () => {
    const href = window.location.href;
    const [protocol, url] = href.split('://');
    const state = `${protocol}://${url.split('/').shift()}/kakao`;

    window.location.href = `http://localhost:4000/auth/kakao?state=${state}`;
  };

  return (
    <div>
      <button onClick={handleClickKakaoLogin}>카카오 로그인</button>
    </div>
  );
}
