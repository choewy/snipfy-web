import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Adb as AdbIcon, Close as CloseIcon, GitHub as GitHubIcon, LightMode as LightModeIcon, Search as SearchIcon } from '@mui/icons-material';

import { useNewsConfigStore } from '../../store/news-config.store';
import { useScrollStore } from '../../store/scoll.store';

export class LayoutComponent {
  public static Nav() {
    const { visible, hideNews } = useNewsConfigStore();
    const { borderBottomWidth, setBorderBottomWidth } = useScrollStore();

    useEffect(() => {
      window.addEventListener('scroll', setBorderBottomWidth);

      return () => {
        window.removeEventListener('scroll', setBorderBottomWidth);
      };
    }, []);

    return (
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#f8fafc',
          borderBottomWidth,
          borderBottomStyle: 'solid',
          borderBottomColor: '#e2e8f0',
        }}
        elevation={0}
      >
        {visible && (
          <Box sx={{ display: 'flex', backgroundColor: '#020617', color: '#f8fafc', height: '2rem', padding: 1, boxSizing: 'border-box' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Welcome to Snipfy</Box>
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button size="small" sx={{ color: '#f8fafc', minWidth: '30px', maxWidth: '30px', width: '30px' }} onClick={() => hideNews()}>
                <CloseIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        )}
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: 'flex', mr: 1, color: '#1e293b' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: 'flex',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                color: '#1e293b',
              }}
            >
              SNIPFY
            </Typography>
            <Box sx={{ flexGrow: 1, gap: 1, display: 'flex' }}></Box>
            <Box sx={{ flexGrow: 0, gap: 1, display: 'flex' }}>
              <Button variant="outlined" size="small" sx={{ color: '#1e293b', minWidth: '30px', maxWidth: '30px', width: '30px' }}>
                <SearchIcon fontSize="small" />
              </Button>
              <Button variant="outlined" size="small" sx={{ color: '#1e293b', minWidth: '30px', maxWidth: '30px', width: '30px' }}>
                <GitHubIcon fontSize="small" />
              </Button>
              <Button variant="outlined" size="small" sx={{ color: '#1e293b', minWidth: '30px', maxWidth: '30px', width: '30px' }}>
                <LightModeIcon fontSize="small" />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  public static Outlet() {
    return (
      <Box sx={{ backgroundColor: '#f8fafc' }}>
        <Box maxWidth="xl" sx={{ margin: '0 auto' }}>
          <Outlet />
        </Box>
      </Box>
    );
  }
}
