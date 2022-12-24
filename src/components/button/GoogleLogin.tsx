import React, { useEffect } from 'react';
import { GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

import type { RootState } from 'redux/store';
import { action, logOut } from 'redux/module/user';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import clientSecret from 'assets/gapi/client_secret.json';

export default function GoogleLogIn() {
  const isSignIn = useAppSelector((state: RootState) => state.user.isSignIn);
  const dispatch = useAppDispatch();

  const loginHandler = (credentialResponse: CredentialResponse) => {
    const { clientId, credential } = credentialResponse;

    if (clientId && credential) {
      dispatch(action.userLoginGoogle({ clientId, credential }));
    }
  };
  const logoutHandler = async () => {
    dispatch(logOut());
    await googleLogout();
  };

  return (
    <React.Fragment>
      {!isSignIn ? (
        <GoogleOAuthProvider clientId={clientSecret.web.client_id}>
          <GoogleLogin
            onSuccess={loginHandler}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      ) : (
        <button onClick={() => logoutHandler()}> 로그아웃 </button>
      )}
    </React.Fragment>
  );
}
