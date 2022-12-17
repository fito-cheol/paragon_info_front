import React from 'react';
import type { RootState } from 'redux/store';
import { action } from 'redux/module/post';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

export default function Counter() {
  const error = useAppSelector((state: RootState) => state.post.error);
  const dispatch = useAppDispatch();
  const buttonEvent = async () => {
    const mockData = {
      heroName: 'gideon',
      skillTree: ['Q', 'E', 'R'],
      startItems: ['potion', 'ward'],
      endItems: ['ward', 'potion'],
      possibleItems: ['gun', 'hat'],
      text: '공략 내용',
      title: '공략 제목',
    };
    dispatch(action.uploadPost(mockData));
  };
  const buttonEvent2 = async () => {
    const mockData = {
      page: 3,
      pageSize: 1,
    };
    dispatch(action.listPost(mockData));
  };
  return (
    <div>
      <div>
        <button onClick={() => buttonEvent()}>Test Posting</button>
        <button onClick={() => buttonEvent2()}>Test Listting</button>
        <span>{error}</span>
      </div>
    </div>
  );
}
