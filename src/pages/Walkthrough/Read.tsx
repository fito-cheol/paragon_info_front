import React from 'react';
import EditorRead from 'components/post/EditorRead';

import type { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

export default function Read() {
  const content = useAppSelector((state: RootState) => state.post.content);
  return (
    <>
      <h2> 공략 읽기 페이지 아직 비어있음 </h2>
      <EditorRead content={content?.text || ' '}></EditorRead>
    </>
  );
}
