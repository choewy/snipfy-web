import { Box, IconButton, Typography } from '@mui/material';

import { GOOGLE_LOGO_URL, KAKAO_LOGO_URL, NAVER_LOGO_URL } from '../../persistents/image';
import { snipfyApiService } from '../../api/snipfy/snipfy-api.service';
import { SignPlatform } from '../../api/snipfy/persistents/enums';
import { NotiStackEvent } from '../../persistents/events/noti-stack.event';

export class LoginComponent {
  public static LoginForm() {
    const handleLoginSocial = (platform: SignPlatform) => async () => {
      const { data, error } = await snipfyApiService.getLoginPageUrl(platform);

      if (error) {
        if (typeof error.statusCode === 'number') {
          return NotiStackEvent.error('소셜 로그인 페이지 요청 실패');
        } else {
          return NotiStackEvent.error(error.message);
        }
      }

      window.location.href = data.url;
    };

    return (
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 600 }}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 600 }}>
          <Typography variant="h3" sx={{ fontSize: 36, fontWeight: 700, textAlign: 'center', color: '#1e293b' }}>
            로그인
          </Typography>
          <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 400, textAlign: 'center', color: '#64748b' }}>
            소셜 계정으로 간편하게 로그인하세요.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 400 }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'center', width: 600 }}>
            <IconButton size="small" sx={{ backgroundColor: '#ffffff' }} onClick={handleLoginSocial(SignPlatform.Google)}>
              <img src={GOOGLE_LOGO_URL} alt="google" width={50} height={50} />
            </IconButton>
            <IconButton size="small" sx={{ backgroundColor: '#fee114' }} onClick={handleLoginSocial(SignPlatform.Kakao)}>
              <img src={KAKAO_LOGO_URL} alt="kakao" width={50} height={50} />
            </IconButton>
            <IconButton size="small" sx={{ backgroundColor: '#29bc5a' }} onClick={handleLoginSocial(SignPlatform.Naver)}>
              <img src={NAVER_LOGO_URL} alt="naver" width={50} height={50} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }
}
