import React, { useState, useEffect } from 'react';
import { LoginSocialGoogle, IResolveParams } from 'reactjs-social-login';

import { GoogleLoginButton } from 'react-social-login-buttons';
import Button from '@mui/material/Button';

import type { RootState } from 'redux/store';
import { logIn, logOut } from 'redux/module/user';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import clientSecret from 'assets/gapi/client_secret.json';
import { googleLogin } from 'api/user/index';

// https://github.com/cuongdevjs/reactjs-social-login/blob/master/example/src/App.tsx

interface GoogleReturn {
  access_token: string;
  family_name: string;
  given_name: string;
  email: string;
}

export default function GoogleLogIn() {
  const [profile, setProfile] = useState<GoogleReturn>();

  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile) {
      loginHandler(profile);
    }
  }, [profile]);

  const loginHandler = async (profile: GoogleReturn) => {
    const clientId = clientSecret.web.client_id;
    const { access_token, family_name, given_name, email } = profile;
    const { user } = await googleLogin({ full_name: `${family_name}${given_name}`, email, clientId, access_token });
    dispatch(logIn(user));
  };
  const logoutHandler = async () => {
    dispatch(logOut());
  };

  return (
    <React.Fragment>
      {!user ? (
        <LoginSocialGoogle
          client_id={clientSecret.web.client_id}
          scope='openid profile email'
          discoveryDocs='claims_supported'
          access_type='offline'
          onResolve={({ provider, data }: IResolveParams) => {
            console.log(provider, data);
            setProfile(data as GoogleReturn);
          }}
          onReject={err => {
            console.log(err);
          }}
        >
          <GoogleLoginButton iconSize='30px' />
        </LoginSocialGoogle>
      ) : (
        <Button style={{ margin: '5px' }} variant='contained' color='primary' onClick={() => logoutHandler()}>
          로그아웃
        </Button>
      )}
    </React.Fragment>
  );
}
