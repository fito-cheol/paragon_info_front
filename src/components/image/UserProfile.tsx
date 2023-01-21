import React from 'react';
import axios from 'axios';

import { logOut } from 'redux/module/user';
import { useAppDispatch } from 'redux/hooks';

import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './Item.scoped.scss';

interface ImageItemProps {
  user: UserFull;
}

export default function UserProfile({ user }: ImageItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const logoutHandler = async () => {
    const revoke_url = 'https://oauth2.googleapis.com/revoke';
    if (user) {
      dispatch(logOut());
      try {
        await axios.post(revoke_url, { token: user.access_token });
      } catch (err) {
        toast.error(err as string);
      }
    }
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const logOutHandler = async () => {
    await logoutHandler();
    setAnchorEl(null);
  };

  return (
    <div>
      <img
        src={user.picture}
        width={50}
        height={50}
        style={{ borderRadius: '50%', cursor: 'pointer' }}
        onClick={handlePopoverOpen}
      ></img>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        aria-labelledby='composition-button'
        open={Boolean(anchorEl)}
        onClose={handlePopoverClose}
      >
        <MenuItem onClick={logOutHandler} sx={{ minWidth: 100 }}>
          <Typography textAlign='center'> 로그아웃 </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
