import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Button from 'components/button/ColoredButton';
import ToggleColorMode from 'components/button/ToggleColorMode';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Link to='/item' style={{ textDecoration: 'none' }}>
            <Button>아이템</Button>
          </Link>
          <Link to='/hero' style={{ textDecoration: 'none' }}>
            <Button>영웅</Button>
          </Link>
          <Link to='/Walkthrough' style={{ textDecoration: 'none' }}>
            <Button>공략쓰기</Button>
          </Link>
          <Link to='/list' style={{ textDecoration: 'none' }}>
            <Button>공략리스트</Button>
          </Link>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <ToggleColorMode />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
