// features/counter/counterSlice.js //
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// 초기 값의 타입 정의
export interface CounterState {
  value: number;
}

// 초기 값 선언
const initialState: CounterState = {
  value: 0,
};

// slice 생성
export const counterSlice = createSlice({
  // slice 이름 정의
  name: 'counter',
  // 초기 값
  initialState,
  // 리듀서. 여러 개 기입 가능
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // RTK에서는 action에 PayloadAction<T>를 타입으로 사용해야한다.
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// 각각의 리듀서의 액션을 생성
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// slice를 내보냄
export default counterSlice.reducer;
