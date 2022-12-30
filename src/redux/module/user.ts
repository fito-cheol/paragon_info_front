import cookies from 'js-cookie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// https://cocoder16.tistory.com/65

interface PostState {
  loading: boolean;
  error: null | string;
  isSignIn: boolean;
  user: User | null;
}

const clientIdInit = cookies.get('clientId');
const credentialInit = cookies.get('credential');
const nicknameInit = cookies.get('nickname');
const isInitCookie = !!clientIdInit && !!nicknameInit && !!credentialInit;

const initialState: PostState = {
  loading: false,
  error: null,
  isSignIn: isInitCookie,
  user: isInitCookie
    ? {
        clientId: clientIdInit,
        credential: credentialInit,
        nickname: nicknameInit,
      }
    : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state) {
      state.isSignIn = false;
      state.user = null;
      cookies.remove('clientId');
      cookies.remove('credential');
      cookies.remove('nickname');
    },
    logIn(state, action: PayloadAction<User>) {
      state.isSignIn = true;
      state.user = action.payload;
      cookies.set('clientId', action.payload.clientId);
      cookies.set('credential', action.payload.credential);
      cookies.set('nickname', action.payload.nickname);
    },
    updateNick(state, { payload }) {
      if (state.user) {
        state.user = {
          ...state.user,
          nickname: payload.nickname,
        };
      }
      cookies.set('nickname', payload.nickname);
    },
  },
});

export const { logOut, logIn } = userSlice.actions;
export default userSlice.reducer;
