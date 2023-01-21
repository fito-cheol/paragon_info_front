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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Grid container xs={12}>
            <Grid xs='auto' container className={`link--wrapper`}>
              <Button
                variant={location.pathname == '/list' ? 'contained' : undefined}
                onClick={event => handleClick(event, '/list')}
              >
                공략
              </Button>
            </Grid>
            <Grid xs='auto' container className={`link--wrapper`}>
              <Button
                variant={location.pathname == '/item' ? 'contained' : undefined}
                onClick={event => handleClick(event, '/item')}
              >
                아이템
              </Button>
            </Grid>
            <Grid xs='auto' container className={`link--wrapper`}>
              <Button
                variant={location.pathname.startsWith('/hero') ? 'contained' : undefined}
                onClick={event => handleClick(event, '/hero')}
              >
                영웅
              </Button>
            </Grid>
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
