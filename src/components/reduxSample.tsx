import React from 'react';
import type { RootState } from '../redux/store';
import { decrement, increment } from '../redux/module/counter';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

export default function Counter() {
  // 1번에서 언급했던 RootState가 useSelector에서 state의 타입으로 사용된 것을 볼 수 있다
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button aria-label='Increment value' onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
}
