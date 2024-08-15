"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { SignedIn  } from "@clerk/nextjs";


const pages = [
    {displayName: 'Home', route: "/home"}, 
    {displayName: 'My Plants', route: "/my-plants"},
    {displayName: 'Diagnose Plant 🅱️', route: "/diagnose-plant/beta"}
  ];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{bgcolor: "#EEF0E5", color: "#163020" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
            src={"/logo.png"}
            alt={"My little tree"}
            loading="lazy"
            style={{
              display: 'flex',
              flexGrow: 1,
              maxWidth:'36px'
            }}
          />
            My Little Tree
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              
              sx={{color: "#3304D30"}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                color: "#163020"
              }}
            >
              {pages.map(({route,displayName}) => (
                <Link key={displayName} href={route}>
                  <Typography textAlign="center" sx={{mx:2, border: 'none'}}>{displayName}</Typography>
                </Link>
              ))}
            </Menu>
          </Box>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
            {pages.map(({route,displayName}) => (
                <Link key={displayName} href={route} style={{ textDecoration: 'none' }} >
                  <Typography  textAlign="center" color="text.primary" mx={1}>{displayName}</Typography>
                </Link>
              ))}
          </Box>
          <SignedIn>
          <Box sx={{ flexGrow: 0 }}>
           
            <Button variant='contained'
                href="/add-plant"
                  sx={{mr:4, 
                  backgroundColor:'#304D30',
                  ':hover': {
                    bgcolor: '#304D30', 
                    opacity: '.8',
                    color: 'white',
                  },}}>
                    New Plant
            </Button>
          </Box>
          </SignedIn>
          <Box sx={{ flexGrow: 0 }}>
            <UserButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigation;