import React, { useEffect } from 'react';
import { GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import cookies from 'js-cookie';

import type { RootState } from 'redux/store';
import { logIn, logOut } from 'redux/module/user';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import { toast } from 'react-toastify';
import Button from '@mui/material/Button';

import clientSecret from 'assets/gapi/client_secret.json';
import { googleLogin } from 'api/user/index';

export default function GoogleLogIn() {
  // const [userInfo, setUserInfo] = useState<User | null>(null);

  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const clientId = cookies.get('clientId');
    const credential = cookies.get('credential');
    const nickname = cookies.get('nickname');
    if (clientId && credential && nickname) {
      const newUser: User = {
        clientId,
        credential,
        nickname,
      };
      dispatch(logIn(newUser));
    }
  }, []);

  const loginHandler = async (credentialResponse: CredentialResponse) => {
    const { clientId, credential } = credentialResponse;

    if (clientId && credential) {
      const newUser = await googleLogin({ clientId, credential });
      dispatch(logIn(newUser));
    }
  };

  const logoutHandler = async () => {
    dispatch(logOut());
    await googleLogout();
  };

  return (
    <React.Fragment>
      {!user ? (
        <GoogleOAuthProvider clientId={clientSecret.web.client_id}>
          <GoogleLogin
            onSuccess={loginHandler}
            onError={() => {
              toast.error('로그인 실패');
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
