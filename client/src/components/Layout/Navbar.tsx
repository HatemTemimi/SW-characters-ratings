import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {  Grid, Link, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';
import { authReducerType } from 'types/reducer';
import { useState } from 'react';

export default function MenuAppBar() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user, dispatch } = useAuthContext()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({type: authReducerType.LOGOUT, payload:null})
    handleClose()
    navigate('/login')
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar   color="transparent" position="static">
        <Toolbar sx={{justifyContent:'space-between'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 4 }}
            href='/'
          >
            ✧
          </IconButton>
          {user ? (
            <Grid maxWidth={'100%'}>
              <Typography variant='overline'>{user?.username}</Typography>
              <IconButton
                size="large"
                aria-label={user.username}
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem >
                <Link href='/ratings'>ratings</Link>
                </MenuItem>
                <MenuItem onClick={logout}>logout</MenuItem>
              </Menu>
            </Grid>
          ):
          (<Link href='/login'>signin</Link>)
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
