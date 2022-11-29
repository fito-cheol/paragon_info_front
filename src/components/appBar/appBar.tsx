import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Button from '../button/ColoredButton';
import ToggleColorMode from '../button/ToggleColorMode';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Link to='/item'>
            <Button>아이템</Button>
          </Link>
          <Link to='/hero'>
            <Button>영웅</Button>
          </Link>
          <Link to='/Walkthrough'>
            <Button>공략 쓰기</Button>
          </Link>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <ToggleColorMode />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
