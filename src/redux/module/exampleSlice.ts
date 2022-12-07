import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// https://cocoder16.tistory.com/65
// https://velog.io/@raejoonee/createAsyncThunk <- dispatch 사용법

interface MyKnownError {
  errorMessage: string;
}

interface TodosAttributes {
  id: number;
  text: string;
  completed: boolean;
}

const fetchTodos = createAsyncThunk<
  TodosAttributes[], // 성공 시 리턴 타입
  number, // input type
  { rejectValue: MyKnownError } // thunkApi 정의({dispatch?, state?, extra?, rejectValue?})
>('todos/fetchTodos', async (userId, thunkAPI) => {
  try {
    const { data } = await axios.get(`https://localhost:3000/todos/${userId}`);
    return data;
  } catch (e) {
    return { errorMessage: '알 수 없는 에러가 발생했습니다.' };
  }
});

interface ITodoState {
  loading: boolean;
  error: null | string;
  todos: TodosAttributes[];
}

const initialState: ITodoState = {
  loading: false,
  error: null,
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      const { id, text } = action.payload;
      state.todos.push({ id, text, completed: false });
    },
    toggleTodo(state, action) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.todos = payload;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.error = payload ? payload.errorMessage : null;
        state.loading = false;
      });
  },
});

export const action = {
  fetchTodos,
};
export const { addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
