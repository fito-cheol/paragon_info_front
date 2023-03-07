import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';

import Button from 'components/button/MainButton';
import GoogleLogIn from 'components/button/GoogleLogin';
import ToggleColorMode from 'components/button/ToggleColorMode';
import UserProfile from 'components/image/UserProfile';

import type { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

import bearFoot from 'assets/icon/bear_foot.png';
import './appBar.scoped.scss';

export default function ButtonAppBar() {
  const user = useAppSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pathname: string) => {
    if (event.ctrlKey) {
      window.open(pathname, '_blank');
    } else {
      navigate({ pathname });
    }
  };
  const linkButton = (text: string, path: string) => {
    return (
      <Grid xs='auto' container className='link__wrapper' sx={{ display: 'flex' }} alignItems={'center'}>
        <Button
          variant={location.pathname == path ? 'contained' : undefined}
          onClick={event => handleClick(event, path)}
        >
          <p className='link__text'>{text} </p>
        </Button>
      </Grid>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Grid container xs={12}>
            <Grid xs='auto' alignContent='center' sx={{ display: 'flex' }}>
              <button
                className='logo__button'
                onClick={event => handleClick(event, '/')}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <img className='logo__button--image' src={bearFoot} loading='lazy' alt='forwin_logo' />
              </button>
            </Grid>
            {linkButton('공략', '/list')}
            {linkButton('티어 리스트', '/tier')}
            {linkButton('유튜브', '/youtube')}
            {linkButton('아이템', '/item')}
            {linkButton('영웅', '/hero')}
            {linkButton('맛집공략', '/food')}
            <Grid xs='auto' xsOffset='auto' sx={{ display: 'flex' }} alignItems={'center'}>
              <ToggleColorMode />
            </Grid>
            <Grid xs='auto' alignItems={'center'} sx={{ display: 'flex' }}>
              {user ? <UserProfile user={user} /> : <GoogleLogIn />}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
