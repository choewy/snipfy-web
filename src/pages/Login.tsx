import { SignPlatform } from '../api/snipfy/persistents/enums';
import { snipfySignApiService } from '../api/snipfy/snipfy-api.service';

export default function LoginPage() {
  const handleClickSocialLogin = (platform: SignPlatform) => {
    return async () => {
      const getLoginPageUrlResult = await snipfySignApiService.getLoginPageUrl(platform);

      if (!getLoginPageUrlResult.ok) {
        // TODO
        throw new Error('로그인 페이지 요청 실패');
      }

      window.location.href = getLoginPageUrlResult.data.url;
    };
  };

  return (
    <div>
      <button onClick={handleClickSocialLogin(SignPlatform.Kakao)}>카카오 로그인</button>
      <button onClick={handleClickSocialLogin(SignPlatform.Naver)}>네이버 로그인</button>
      <button onClick={handleClickSocialLogin(SignPlatform.Google)}>구글 로그인</button>
    </div>
  );
}
