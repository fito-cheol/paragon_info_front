import React from 'react';
import type { RootState } from 'redux/store';
import { action } from 'redux/module/post';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

export default function Counter() {
  const error = useAppSelector((state: RootState) => state.post.error);
  const dispatch = useAppDispatch();
  const buttonEvent = async () => {
    dispatch(action.uploadPost(1));
  };
  return (
    <div>
      <div>
        <button onClick={() => buttonEvent()}>Test Posting</button>
        <span>{error}</span>
      </div>
    </div>
  );
}
