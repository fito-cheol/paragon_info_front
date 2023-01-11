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
          <Grid container xs={12} spacing={3}>
            <Grid xs='auto'>
              <Button onClick={event => handleClick(event, '/list')}>공략 </Button>
            </Grid>
            <Grid xs='auto'>
              <Button onClick={event => handleClick(event, '/item')}>아이템 </Button>
            </Grid>
            <Grid xs='auto'>
              <Button onClick={event => handleClick(event, '/hero')}>영웅 </Button>
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
