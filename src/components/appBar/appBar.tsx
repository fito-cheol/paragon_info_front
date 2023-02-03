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
      <Grid xs='auto' container className={`link--wrapper`}>
        <Button
          variant={location.pathname == path ? 'contained' : undefined}
          onClick={event => handleClick(event, path)}
        >
          {text}
        </Button>
      </Grid>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Grid container xs={12}>
            <Grid container xs='auto' xsOffset='auto' alignContent={'center'} padding={3}>
              <button
                type='button'
                className='btm_image'
                id='img_btn'
                onClick={event => handleClick(event, '/')}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <img src={bearFoot} width={50} height={50} />
              </button>
              {/* <img src={bearFoot} width={50} height={50} onClick={event => handleClick(event, '/')} /> */}
            </Grid>
            {linkButton('공략', '/list')}
            {linkButton('티어 리스트', '/tier')}
            {linkButton('유튜브', '/youtube')}
            {linkButton('아이템', '/item')}
            {linkButton('영웅', '/hero')}
            <Grid container xs='auto' xsOffset='auto' alignContent={'center'} padding={3}>
              <ToggleColorMode />
            </Grid>
            <Grid container xs='auto' alignContent={'center'}>
              {user ? <UserProfile user={user} /> : <GoogleLogIn />}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
