import cookies from 'js-cookie';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { googleLogin, updateNickname } from 'api/user/index';

// https://cocoder16.tistory.com/65
// https://velog.io/@raejoonee/createAsyncThunk <- dispatch 사용법

type SuccessReturn = string;

interface ErrorReturn {
  errorMessage: string;
}
interface LoginForamt {
  clientId: string;
  credential: string;
}

interface UpdateNickFormat {
  nickname: string;
}
interface LoginSuccessReturn {
  newUser: boolean;
  message: string;
  clientId: string;
  credential: string;
}

const userLoginGoogle = createAsyncThunk<
  LoginSuccessReturn, // 성공 시 리턴 타입
  LoginForamt, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('user/googleLogin', async (postInfo, { rejectWithValue }) => {
  try {
    const result = await googleLogin(postInfo);
    return result as any;
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message });
  }
});

interface PostState {
  loading: boolean;
  error: null | string;
  isSignIn: boolean;
  nickname: string;
}

const initialState: PostState = {
  loading: false,
  error: null,
  isSignIn: cookies.get('clientId') ? true : false,
  nickname: cookies.get('nickname') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state) {
      state.isSignIn = false;
      cookies.remove('clientId');
      cookies.remove('credential');
      cookies.remove('nickname');
    },
    logIn(state, { payload }) {
      state.isSignIn = true;
      state.nickname = payload.nickname;
      cookies.set('clientId', payload.clientId);
      cookies.set('credential', payload.credential);
      cookies.set('nickname', payload.nickname);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userLoginGoogle.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(userLoginGoogle.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;

        userSlice.caseReducers.logIn(state, action);
      })
      .addCase(userLoginGoogle.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      });
  },
});

export const action = {
  userLoginGoogle,
};
export const { logOut, logIn } = userSlice.actions;
export default userSlice.reducer;
