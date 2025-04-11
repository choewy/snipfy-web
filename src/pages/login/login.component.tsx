import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Google as GoogleIcon } from '@mui/icons-material';

import { useLoginStore } from '../../store/login.store';
import { GOOGLE_LOGO_URL, KAKAO_LOGO_URL, NAVER_LOGO_URL } from '../../persistents/image';
import { snipfyApiService } from '../../api/snipfy/snipfy-api.service';
import { SignPlatform } from '../../api/snipfy/persistents/enums';
import { NotiStackEvent } from '../../persistents/events/noti-stack.event';

export class LoginComponent {
  public static LoginForm() {
    const navigate = useNavigate();

    const { email, password, passwordVisible, changeEmail, changePassword, changePasswordVisible } = useLoginStore();

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
      changeEmail(e.target.value);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
      changePassword(e.target.value);
    };

    const handleLogin = async () => {};

    const handleChangePasswordVisible = () => {
      changePasswordVisible();
    };

    const handleRegisterPage = () => {
      navigate('/register');
    };

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
            이메일과 소셜 계정으로 간편하게 로그인하세요.
            <br />
            이메일 계정으로 로그인 후 소셜 계정을 연동하면 간편하게 로그인 할 수 있습니다.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 400 }}>
          <TextField
            fullWidth
            type="text"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            autoComplete="off"
            placeholder=""
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            fullWidth
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleChangePassword}
            autoComplete="off"
            placeholder=""
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleChangePasswordVisible}>{passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center', width: 600 }}>
            <Button variant="contained" color="primary" sx={{ width: 100 }} onClick={handleLogin}>
              로그인
            </Button>
            <Button variant="outlined" color="primary" sx={{ width: 100 }} onClick={handleRegisterPage}>
              회원가입
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center', width: 600 }}>
            <Divider sx={{ width: 300 }} />
            <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 400, textAlign: 'center', color: '#64748b' }}>
              or
            </Typography>
            <Divider sx={{ width: 300 }} />
          </Box>

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
