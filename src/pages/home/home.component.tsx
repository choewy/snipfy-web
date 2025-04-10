import { useState } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Paper, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { CopyAll as CopyAllIcon } from '@mui/icons-material';

import { useLinkFormStore } from '../../store/link-form.store';

export class HomeComponent {
  public static LinkModal() {
    const { modalOpen, status, linkUrl, qrCodeUrl, expiredAt, errorMessage, closeModal } = useLinkFormStore();

    // TODO: 오류 메시지 표시
    console.log(errorMessage);

    return (
      <Dialog open={modalOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">단축 링크 생성</DialogTitle>
        {status === 'pending' ? (
          <div>생성중</div>
        ) : (
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
                      <Button size="small" sx={{ color: '#1e293b', minWidth: '30px', maxWidth: '30px', width: '30px' }} onClick={() => navigator.clipboard.writeText(linkUrl)}>
                        <CopyAllIcon />
                      </Button>
                    </Tooltip>
                  ),
                },
              }}
              helperText={expiredAt ? `생성된 링크는 ${expiredAt}에 삭제됩니다.` : undefined}
            />
            <img alt="qrcode" src={qrCodeUrl} />
          </DialogContent>
        )}
        <DialogActions>
          <Button size="small" sx={{ color: '#1e293b' }} onClick={closeModal}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  public static LinkForm() {
    const { create } = useLinkFormStore();

    const [url, setUrl] = useState<string>('');

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
            onChange={(e) => setUrl(e.target.value)}
            slotProps={{
              input: { startAdornment: <InputAdornment position="start">URL</InputAdornment> },
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
