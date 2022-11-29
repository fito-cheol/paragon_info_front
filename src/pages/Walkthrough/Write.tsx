import React from 'react';
import EditorWrite from '../../components/post/EditorWrite';
import AutoHero from '../../components/input/autocompleteHero';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
];

export default function Write() {
  return (
    <div>
      <h2> 공략 쓰기페이지 작업중 </h2>
      <h2> 영웅 선택 </h2>
      <AutoHero />
      <h2> 스킬트리 선택 </h2>
      <h2> 아이템 선택 </h2>
      <EditorWrite></EditorWrite>
    </div>
  );
}
