import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { upload, list, getTotalCount, getPost, modifyPost, deletePost } from 'api/post/index';

type SuccessReturn = string;

interface ErrorReturn {
  errorMessage: string;
  response: AxiosResponse<unknown, any> | undefined;
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
    const { message, response } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message, response });
  }
});
const postUpdate = createAsyncThunk<
  SuccessReturn, // 성공 시 리턴 타입
  UpdatePostFormat, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('post/modifyPost', async (postInfo, { rejectWithValue }) => {
  try {
    const result = await modifyPost(postInfo);
    return result as any;
  } catch (error) {
    const { message, response } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message, response });
  }
});

const postDelete = createAsyncThunk<
  SuccessReturn, // 성공 시 리턴 타입
  DeletePostFormat, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('post/deletePost', async (postInfo, { rejectWithValue }) => {
  try {
    const result = await deletePost(postInfo);
    return result as any;
  } catch (error) {
    const { message, response } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message, response });
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
    const { message, response } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message, response });
  }
});

const getPostInfo = createAsyncThunk<
  { post: Post; content: Content; user: User }, // 성공 시 리턴 타입
  GetPostFormat, // First argument to the payload creator
  { rejectValue: ErrorReturn } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('post/getPost', async (postId, { rejectWithValue }) => {
  try {
    const result = await getPost(postId);
    return result as any;
  } catch (error) {
    const { message, response } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message, response });
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
    const { message, response } = error as unknown as AxiosError;
    return rejectWithValue({ errorMessage: message, response });
  }
});

interface PostState {
  loading: boolean;
  error: null | string;
  postList: Post[];

  totalCount: number;
  selectedPost: PostFullInfo | null;
}
interface PostFullInfo {
  post: Post;
  content: Content;
  user: User;
}

const initialState: PostState = {
  loading: false,
  error: null,
  postList: [],
  totalCount: 0,
  selectedPost: null,
};

const todosSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    cleanSelectedPost(state) {
      state.selectedPost = null;
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
        state.selectedPost = payload;
      })
      .addCase(getPostInfo.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      })
      .addCase(postUpdate.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(postUpdate.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(postUpdate.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      })
      .addCase(postDelete.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(postDelete.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(postDelete.rejected, (state, { payload }) => {
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
  getPostCount,
  postDelete,
  postUpdate,
};
export const { cleanSelectedPost } = todosSlice.actions;
export default todosSlice.reducer;
