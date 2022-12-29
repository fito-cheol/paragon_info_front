import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import cookies from 'js-cookie';

import { googleLogin } from 'api/user/index';

import Button from '@mui/material/Button';

import clientSecret from 'assets/gapi/client_secret.json';

export default function GoogleLogIn() {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const clientId = cookies.get('clientId');
    const credential = cookies.get('credential');
    const nickname = cookies.get('nickname');
    if (clientId && credential && nickname) {
      setUserInfo({
        clientId,
        credential,
        nickname,
      });
    }
  }, []);

  const logIn = (payload: User) => {
    const newUser = {
      nickname: payload.nickname,
      clientId: payload.clientId,
      credential: payload.credential,
    };
    setUserInfo(newUser);
    cookies.set('clientId', payload.clientId);
    cookies.set('credential', payload.credential);
    cookies.set('nickname', payload.nickname);
  };

  const logOut = () => {
    cookies.remove('clientId');
    cookies.remove('credential');
    cookies.remove('nickname');
    setUserInfo(null);
  };
  const loginHandler = async (credentialResponse: CredentialResponse) => {
    const { clientId, credential } = credentialResponse;

    if (clientId && credential) {
      const response = await googleLogin({ clientId, credential });
      logIn(response);
    }
  };

  const logoutHandler = async () => {
    logOut();
    await googleLogout();
  };

  return (
    <React.Fragment>
      {!userInfo ? (
        <GoogleOAuthProvider clientId={clientSecret.web.client_id}>
          <GoogleLogin
            onSuccess={loginHandler}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      ) : (
        <Button style={{ margin: '5px' }} variant='contained' color='primary' onClick={() => logoutHandler()}>
          로그아웃
        </Button>
      )}
    </React.Fragment>
  );
}
