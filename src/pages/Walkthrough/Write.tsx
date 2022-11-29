import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import EditorWrite from '../../components/post/EditorWrite';
import AutoHero from '../../components/input/autocompleteHero';
import SkillTree from '../../components/image/SkillTree';

type SkillTreeType = 'Q' | 'E' | 'R' | 'Right' | 'None';

export default function Write() {
  const [skillTreeArray, setSkillTreeArray] = useState<SkillTreeType[]>([]);
  const [skillTreeElements, setSkillTreeElements] = useState<JSX.Element[]>([<div key={1}></div>]);

  // onMount
  useEffect(() => {
    const initialArray = Array(18).fill('None');
    setSkillTreeArray(initialArray);
  }, []);

  // computed
  useEffect(() => {
    setSkillTreeElements(
      skillTreeArray.map((skillTreeElement, index) => {
        return <SkillTree key={index} type={skillTreeElement} onClick={() => removeSkillTree(index)} />;
      }),
    );
  }, [skillTreeArray]);

  // method
  const addSkillTree = (skillType: SkillTreeType) => {
    // none이 아닌 가장 첫번 째 element에 넣고 탈출
    const newSkillTreeArray = [...skillTreeArray];
    for (let index = 0; index < newSkillTreeArray.length; index++) {
      const skillTreeElement = newSkillTreeArray[index];
      if (skillTreeElement == 'None') {
        newSkillTreeArray[index] = skillType;
        break;
      }
    }
    setSkillTreeArray(newSkillTreeArray);
  };

  const removeSkillTree = (indexRemove: number) => {
    const newSkillTreeArray = [...skillTreeArray];
    newSkillTreeArray[indexRemove] = 'None';
    setSkillTreeArray(newSkillTreeArray);
  };

  return (
    <div>
      <h2> 공략 쓰기페이지 작업중 </h2>
      <h2> 영웅 선택 </h2>
      <AutoHero />
      <h2> 스킬트리 선택 </h2>
      <Grid container>
        <Grid xs={12}>
          <SkillTree type='Q' onClick={() => addSkillTree('Q')} />
          <SkillTree type='E' onClick={() => addSkillTree('E')} />
          <SkillTree type='R' onClick={() => addSkillTree('R')} />
          <SkillTree type='Right' onClick={() => addSkillTree('Right')} />
        </Grid>
        <Grid xs={12}>{skillTreeElements}</Grid>
      </Grid>
      <h2> 아이템 선택 </h2>
      <EditorWrite></EditorWrite>
    </div>
  );
}
