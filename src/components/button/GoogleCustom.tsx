import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';

import type { RootState } from 'redux/store';
import { logIn, logOut } from 'redux/module/user';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import { toast } from 'react-toastify';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Button from '@mui/material/Button';

import clientSecret from 'assets/gapi/client_secret.json';
import { googleLogin } from 'api/user/index';

import './GoogleCustom.scoped.scss';

// Ref1 https://developers.google.com/identity/protocols/oauth2/web-server
// Ref2 https://github.com/googleapis/google-api-nodejs-client

const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];
const scope = scopes.join(' ');

const BASE_URL = process.env.REACT_APP_BASE_URL;

const redirectUri = `${BASE_URL}/redirect`;

const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientSecret.web.client_id}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;

export default function GoogleLogIn() {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);

  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!externalPopup || externalPopup.closed) {
      window.removeEventListener('message', receiveMessage);
      return;
    }
    window.addEventListener('message', receiveMessage);
  }, [externalPopup]);

  const oAuthHandler = (): void => {
    openSignInWindow(GoogleURL, '구글 로그인');
  };

  const openSignInWindow = (url: string, title: string) => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - 500) / 2;
    const top = window.screenY + (window.outerHeight - 400) / 2.5;
    const popup = window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
    if (popup) {
      popup.focus();
    }

    setExternalPopup(popup);
  };

  const receiveMessage = async (event: any) => {
    const { data } = event;
    console.log(data);
    const params = queryString.parse(data);
    const { access_token } = params;
    if (access_token && typeof access_token == 'string') {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const { email, family_name, given_name, verified_email, picture } = res.data;
        const { user } = await googleLogin({
          full_name: `${family_name}${given_name}`,
          email,
          clientId: clientSecret.web.client_id,
          access_token: access_token,
        });
        dispatch(logIn(user));
      } catch {
        toast.error('로그인 에러 발생');
      }
    }

    setExternalPopup(null);
  };

  const logoutHandler = async () => {
    dispatch(logOut());
  };

  return (
    <React.Fragment>
      {!user ? (
        <GoogleLoginButton
          className='button__google'
          onClick={() => {
            oAuthHandler();
          }}
          iconSize='30px'
        />
      ) : (
        <Button variant='contained' color='primary' className='button__logout' onClick={() => logoutHandler()}>
          로그아웃
        </Button>
      )}
    </React.Fragment>
  );
  // <button onClick={oAuthHandler}>Google Login하기</button>;
}
