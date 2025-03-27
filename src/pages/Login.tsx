import { SignApi } from '../api/SignApi';
import { SocialPlatform } from '../persistent/enums';

export default function LoginPage() {
  const handleClickSocialLogin = (platform: SocialPlatform) => {
    return async () => {
      await SignApi.getSocialLoginPageUrl(platform).then((response) => {
        const url = response.data?.data?.url;

        if (!url) {
          throw new Error();
        }

        window.location.href = url;
      });
    };
  };

  return (
    <div>
      <button onClick={handleClickSocialLogin(SocialPlatform.Kakao)}>카카오 로그인</button>
      <button onClick={handleClickSocialLogin(SocialPlatform.Naver)}>네이버 로그인</button>
      <button onClick={handleClickSocialLogin(SocialPlatform.Google)}>구글 로그인</button>
    </div>
  );
}
