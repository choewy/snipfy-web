import { ChangeEvent, useState } from 'react';

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { CopyAll as CopyAllIcon } from '@mui/icons-material';

import { useCreateLinkResultStore } from '../../store/create-link-result.store';
import { NotiStackEvent } from '../../persistents/events/noti-stack.event';
import { clipboardService } from '../../core/clipboard/clipboard.service';

export class HomeComponent {
  public static LinkModal() {
    const { open, status, linkUrl, qrCodeUrl, expiredAt, closeModal } = useCreateLinkResultStore();

    const handleCopyLink = async () => {
      await clipboardService.copyText(linkUrl);

      NotiStackEvent.success('링크가 복사되었습니다.');
    };

    const handleCopyQrCode = async () => {
      await clipboardService.copyImage(qrCodeUrl);

      NotiStackEvent.success('QR 코드가 복사되었습니다.');
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
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">단축 링크 생성</DialogTitle>
        <DialogContent>
          <DialogContentText>링크 생성이 완료되었습니다.</DialogContentText>
          <TextField
            fullWidth
            value={linkUrl}
            slotProps={{
              input: {
                readOnly: true,
                startAdornment: <InputAdornment position="start">URL</InputAdornment>,
                endAdornment: (
                  <Tooltip title="링크 복사">
                    <Button size="small" sx={{ color: '#1e293b', minWidth: '30px', maxWidth: '30px', width: '30px' }} onClick={handleCopyLink}>
                      <CopyAllIcon />
                    </Button>
                  </Tooltip>
                ),
              },
            }}
            helperText={expiredAt ? `생성된 링크는 ${expiredAt}에 삭제됩니다.` : undefined}
          />
          <img alt="qrcode" src={qrCodeUrl} width={250} height={250} />
          <Button size="small" sx={{ color: '#1e293b', minWidth: '30px', maxWidth: '30px', width: '30px' }} onClick={handleCopyQrCode}>
            <CopyAllIcon />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button size="small" sx={{ color: '#1e293b' }} onClick={closeModal}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  public static LinkForm() {
    const { create } = useCreateLinkResultStore();

    const [url, setUrl] = useState<string>('');

    const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;

      if (
        ['', 'h', 'ht', 'htt', 'http', 'https', 'http:', 'https:', 'http:/', 'https:/', 'http://', 'https://'].includes(url) ||
        url.length === 0 ||
        url.startsWith('http://') ||
        url.startsWith('https://')
      ) {
        return setUrl(url);
      }

      setUrl(`https://${url}`);
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
            autoComplete="off"
            placeholder="https://example.com/bla-bla-bla"
            value={url}
            onChange={handleChangeUrl}
            slotProps={{
              input: {
                style: { backgroundColor: '#ffffff' },
                startAdornment: <InputAdornment position="start">URL</InputAdornment>,
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 600 }}>
            <Button variant="contained" color="primary" sx={{ width: 100 }} onClick={() => create(url)}>
              링크생성
            </Button>
            <Button variant="outlined" color="primary" sx={{ width: 100 }}>
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

  public static Footer() {
    return (
      <footer>
        <Box sx={{ backgroundColor: '#f8fafc', height: '100px', width: '100%' }}></Box>
      </footer>
    );
  }
}
