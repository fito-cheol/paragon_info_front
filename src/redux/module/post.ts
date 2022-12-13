import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { upload } from 'api/post/index';

// https://cocoder16.tistory.com/65
// https://velog.io/@raejoonee/createAsyncThunk <- dispatch 사용법

type SuccessReturn = string;

interface ErrorReturn {
  errorMessage: string;
}

const uploadPost = createAsyncThunk<
  SuccessReturn, // 성공 시 리턴 타입
  number, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('todos/uploadPost', async (userId, { rejectWithValue }) => {
  try {
    const mockData = {
      heroName: 'gideon',
      skillTree: ['Q', 'E', 'R'],
      startItems: ['potion', 'ward'],
      endItems: ['ward', 'potion'],
      text: '공략 내용',
      title: '공략 제목',
    };

    const result = await upload(mockData);
    return result as any;
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    console.log(error);
    return rejectWithValue({ errorMessage: message });
  }
});

interface PostState {
  loading: boolean;
  error: null | string;
}

const initialState: PostState = {
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    emptyReducer() {
      console.log('doing nothing');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadPost.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(uploadPost.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(uploadPost.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      });
  },
});

export const action = {
  uploadPost,
};
export const { emptyReducer } = todosSlice.actions;
export default todosSlice.reducer;
