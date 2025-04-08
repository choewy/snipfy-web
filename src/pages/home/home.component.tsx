import { MouseEvent, useState } from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material';

export class HomeComponent {
  public static Header() {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (e: MouseEvent<HTMLElement>) => {
      setAnchorElement(e.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElement(null);
    };

    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Snipfy
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElement}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={!!anchorElement}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>PAGE</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Snipfy
            </Typography>
            <Box sx={{ flexGrow: 1, gap: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                공지사항
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                이용안내
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                문의
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0, gap: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button variant="outlined">로그인</Button>
              <Button variant="contained">회원가입</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  public static Title() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>TITLE</h1>
      </div>
    );
  }

  public static Description() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3>DESCRIPTION</h3>
      </div>
    );
  }

  public static CreateLinkContent() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3>CREATE LINK</h3>
        <span>CREATE LINK DESCRIPTION</span>
        <label>CREATE LINK COMMENT</label>
        <input type="text" placeholder="https://example.com/bla-bla-bla" />
        <button>CREATE LINK</button>
      </div>
    );
  }

  public static InformationContent() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3>INFORMATION</h3>
        <span>INFORMATION DESCRIPTION</span>
      </div>
    );
  }

  public static Footer() {
    return <footer>FOOTER</footer>;
  }
}
