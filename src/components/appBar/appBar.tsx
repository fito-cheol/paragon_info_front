import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Button from 'components/button/ColoredButton';
import SocialLogin from 'components/button/GoogleLogin';
import ToggleColorMode from 'components/button/ToggleColorMode';

export default function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Grid container xs={12}>
            <Grid xs='auto'>
              <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid xs='auto'>
              <Button onClick={() => navigate({ pathname: '/item' })}>아이템 </Button>
            </Grid>
            <Grid xs='auto'>
              <Button onClick={() => navigate({ pathname: '/hero' })}>영웅 </Button>
            </Grid>
            <Grid xs='auto'>
              <Button onClick={() => navigate({ pathname: '/list' })}>공략 </Button>
            </Grid>
            <Grid container xs='auto' xsOffset='auto' alignContent={'center'}>
              <ToggleColorMode />
            </Grid>
            <Grid container xs='auto' alignContent={'center'}>
              <SocialLogin />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
