import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { upload, list, getTotalCount, getPost, getContent } from 'api/post/index';

// https://cocoder16.tistory.com/65
// https://velog.io/@raejoonee/createAsyncThunk <- dispatch 사용법

type SuccessReturn = string;

interface ErrorReturn {
  errorMessage: string;
}

const uploadPost = createAsyncThunk<
  SuccessReturn, // 성공 시 리턴 타입
  UploadForamt, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('post/uploadPost', async (postInfo, { rejectWithValue }) => {
  try {
    const result = await upload(postInfo);
    return result as any;
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message });
  }
});

const listPost = createAsyncThunk<
  Post[], // 성공 시 리턴 타입
  ListFormat, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('post/listPost', async (postInfo, { rejectWithValue }) => {
  try {
    const result = await list(postInfo);
    return result as any;
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message });
  }
});

const getPostInfo = createAsyncThunk<
  { post: Post; content: Content }, // 성공 시 리턴 타입
  GetPostFormat, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('post/getPost', async (postId, { rejectWithValue }) => {
  try {
    const result = await getPost(postId);
    return result as any;
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message });
  }
});

const getPostContent = createAsyncThunk<
  Content, // 성공 시 리턴 타입
  GetContentFormat, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('post/getPostConetent', async (contentId, { rejectWithValue }) => {
  try {
    const result = await getContent(contentId);
    return result as any;
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message });
  }
});

const getPostCount = createAsyncThunk<
  ReturnCount, // 성공 시 리턴 타입
  null, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('post/getPostCount', async (nothing, { rejectWithValue }) => {
  try {
    const result = await getTotalCount();
    return result as any;
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message });
  }
});

interface PostState {
  loading: boolean;
  error: null | string;
  postList: Post[];
  post: Post | null;
  content: Content | null;
  totalCount: number;
}

const initialState: PostState = {
  loading: false,
  error: null,
  postList: [],
  post: null,
  content: null,
  totalCount: 0,
};

const todosSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    cleanPost(state) {
      state.post = null;
    },
    cleanContent(state) {
      state.content = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadPost.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(uploadPost.fulfilled, state => {
        state.error = null;
        state.loading = false;
      })
      .addCase(uploadPost.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      })
      .addCase(listPost.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(listPost.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.postList = payload;
      })
      .addCase(listPost.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      })
      .addCase(getPostInfo.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getPostInfo.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.post = payload.post;
        state.content = payload.content;
      })
      .addCase(getPostInfo.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      })
      .addCase(getPostContent.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getPostContent.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.content = payload;
      })
      .addCase(getPostContent.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      })
      .addCase(getPostCount.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getPostCount.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        console.log('getPostCount.fulfilled', payload);
        state.totalCount = payload.totalCount;
      })
      .addCase(getPostCount.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      });
  },
});

export const action = {
  uploadPost,
  listPost,
  getPostInfo,
  getPostContent,
  getPostCount,
};
export const { cleanPost, cleanContent } = todosSlice.actions;
export default todosSlice.reducer;
