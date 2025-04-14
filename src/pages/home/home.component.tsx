import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { CopyAll as CopyAllIcon, Download as DownloadIcon, Check as CheckIcon } from '@mui/icons-material';

import { useCreateLinkStore } from '../../store/create-link.store';
import { clipboardService } from '../../core/clipboard/clipboard.service';
import { downloadService } from '../../core/download/download.service';

export class HomeComponent {
  public static LinkModal() {
    const navigate = useNavigate();
    const { open, status, linkUrl, qrCodeUrl, expiredAt, copied, closeModal, copyLink, copyQrCode } = useCreateLinkStore();

    const handleCopyLink = async () => {
      await clipboardService.copyText(linkUrl);
      copyLink();
    };

    const handleCopyQrCode = async () => {
      await clipboardService.copyImage(qrCodeUrl);
      copyQrCode();
    };

    const handleDownloadQrCode = async () => {
      const linkId = linkUrl.split('/').pop();
      const fileName = linkId ? `snipfy-qrcode-${linkId}.png` : 'snipfy-qrcode.png';

      await downloadService.downloadImage(qrCodeUrl, fileName);
    };

    const handleLoginPage = () => {
      closeModal();
      navigate('/login');
    };

    const handleCloseModal = () => {
      closeModal();
    };

    if (status === 'error') {
      return <></>;
    }

    if (status === 'pending' && open === true) {
      return (
        <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress sx={{ color: '#1e293b' }} />
        </Backdrop>
      );
    }

    return (
      <Dialog open={open} aria-describedby="alert-dialog-description">
        <DialogTitle sx={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: '#1e293b' }}>링크 생성이 완료되었습니다.</DialogTitle>
        <DialogContent
          sx={{
            gap: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            width: 500,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <TextField
              size="small"
              fullWidth
              value={linkUrl}
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <Tooltip title="링크 복사">
                      <Button size="small" sx={{ color: '#1e293b', minWidth: '30px', maxWidth: '30px', width: '30px' }} onClick={handleCopyLink}>
                        {copied.link ? <CheckIcon /> : <CopyAllIcon />}
                      </Button>
                    </Tooltip>
                  ),
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              sx={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                display: 'flex',
                padding: 1,
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                borderWidth: 1,
                borderRadius: 5,
                borderStyle: 'solid',
              }}
            >
              <img alt="qrcode" src={qrCodeUrl} width={200} height={200} />
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip title="QR코드 이미지 복사">
                <Button size="small" sx={{ color: '#1e293b', minWidth: '30px', maxWidth: '30px', width: '30px' }} onClick={handleCopyQrCode}>
                  {copied.qrCode ? <CheckIcon /> : <CopyAllIcon />}
                </Button>
              </Tooltip>
              <Tooltip title="QR코드 이미지 다운로드">
                <Button size="small" sx={{ color: '#1e293b', minWidth: '30px', maxWidth: '30px', width: '30px' }} onClick={handleDownloadQrCode}>
                  <DownloadIcon />
                </Button>
              </Tooltip>
            </Box>
          </Box>

          {expiredAt && (
            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Alert variant="outlined" severity="warning" sx={{ width: '100%', alignItems: 'center' }}>
                {`생성된 링크는 ${expiredAt}에 만료됩니다.`}
              </Alert>
              <Alert
                variant="outlined"
                severity="info"
                sx={{ width: '100%', alignItems: 'center' }}
                action={
                  <Button size="small" onClick={handleLoginPage}>
                    로그인
                  </Button>
                }
              >
                로그인하면 링크를 영구 보존할 수 있습니다.
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button size="small" sx={{ color: '#1e293b' }} onClick={handleCloseModal}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  public static LinkForm() {
    const navigate = useNavigate();

    const { url, create, change } = useCreateLinkStore();

    const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
      change(e.target.value);
    };

    const handleCreateLink = () => {
      create(url);
    };

    const handleLoginPage = () => {
      navigate('/login');
    };

    return (
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400 }}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 600 }}>
          <Typography variant="h3" sx={{ fontSize: 36, fontWeight: 700, textAlign: 'center', color: '#1e293b' }}>
            무료로 나만의 단축 링크를 생성하세요.
          </Typography>
          <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 400, textAlign: 'center', color: '#64748b' }}>
            로그인 없이 쉽고 빠르게 단축 링크를 생성하고 공유하세요.
            <br />
            로그인 없이 생성한 단축 링크는 1개월 뒤에 삭제되지만, 로그인 후 생성한 단축 링크는 영구 보존됩니다.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 600 }}>
          <TextField
            fullWidth
            name="url"
            autoComplete="off"
            placeholder="https://example.com/bla-bla-bla"
            value={url}
            onChange={handleChangeUrl}
            slotProps={{
              input: { startAdornment: <InputAdornment position="start">URL</InputAdornment> },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 600 }}>
            <Button variant="contained" color="primary" sx={{ width: 100 }} onClick={handleCreateLink}>
              링크생성
            </Button>
            <Button variant="outlined" color="primary" sx={{ width: 100 }} onClick={handleLoginPage}>
              로그인
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  public static Dashboard() {
    return (
      <Paper
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#e2e8f0',
          borderRadius: 5,
          width: '100%',
          height: '760px',
        }}
      >
        <Box></Box>
      </Paper>
    );
  }
}
