import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import EditorWrite from 'components/post/EditorWrite';
import AutoHero from 'components/input/autocompleteHero';
import SkillTree from 'components/image/SkillTree';
import ImageItemList from 'components/image/ItemList';
import ItemListWithFilter from 'components/combined/ItemListWithFilter';

import { upload } from 'api/post/index';

import './Write.scoped.scss';

export default function Write() {
  const [title, setTitle] = useState<string>('');
  const [skillTreeArray, setSkillTreeArray] = useState<SkillTree[]>([]);
  const [skillTreeElements, setSkillTreeElements] = useState<JSX.Element[]>([<div key={1}></div>]);
  const [clickedRow, setClickedRow] = useState<number>(-1);
  const [show, setShow] = useState<boolean>(false);
  const [selectedItemList, setSelectedItemList] = useState<Item[][]>([[], [], []]);
  const [isSmall, setIsSmall] = useState<boolean>(true);
  const [filter, setFilter] = useState<AttributeCheck | undefined>(undefined);
  const [editorData, setEditorData] = useState<string>(' ');
  const [selectedHeroName, setSelectedHeroName] = useState<string | null>(null);

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

  useEffect(() => {
    setShow(clickedRow >= 0);
  }, [clickedRow]);

  // method
  const addSkillTree = (skillType: SkillTree) => {
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
  const addItemButtonHandler = (rowNumber: number) => {
    setClickedRow(rowNumber);
  };

  const removeSkillTree = (indexRemove: number) => {
    const newSkillTreeArray = [...skillTreeArray];
    newSkillTreeArray[indexRemove] = 'None';
    setSkillTreeArray(newSkillTreeArray);
  };
  const selectItem = (item: Item) => {
    const copyList = selectedItemList.map((itemList, index) => {
      if (index == clickedRow) {
        return [...itemList, item];
      }
      return [...itemList];
    });
    setSelectedItemList(copyList);
    closeItemSelect();
  };
  const removeItem = (rowIndex: number, index: number) => {
    const copiedItemList = [...selectedItemList];
    const copiedRowList = [...selectedItemList[rowIndex]];
    if (index > -1) {
      copiedRowList.splice(index, 1);
    }
    copiedItemList[rowIndex] = copiedRowList;
    setSelectedItemList(copiedItemList);
  };
  const closeItemSelect = () => {
    setClickedRow(-1);
  };
  const saveData = async () => {
    // FIXME: form validation check 할것
    if (selectedHeroName == null) {
      console.warn('선택된 영웅이 없습니다');
      return;
    } else {
      const exportData = {
        heroName: selectedHeroName,
        skillTree: skillTreeArray,
        startItems: selectedItemList[0].map(item => item.name),
        endItems: selectedItemList[1].map(item => item.name),
        possibleItems: selectedItemList[2].map(item => item.name),
        text: editorData,
        title: title,
      };
      await upload(exportData);
    }
  };

  const ItemAdder = (rowIndex: number) => {
    return (
      <Grid container>
        <Grid>
          <ImageItemList
            itemList={selectedItemList[rowIndex]}
            onClick={({ index }) => {
              removeItem(rowIndex, index);
            }}
          />
        </Grid>
        <Grid>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => addItemButtonHandler(rowIndex)}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <h2> 공략 작성 </h2>
      <Grid container>
        <Grid xs={6} md={4} lg={3}>
          <TextField
            fullWidth
            id='title'
            label='제목 *필수*'
            variant='outlined'
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
        </Grid>
      </Grid>
      <h2> 1. 영웅 선택 </h2>
      <AutoHero onChange={setSelectedHeroName} />
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
      <h3> 시작 아이템</h3>
      {ItemAdder(0)}
      <h3> 최종 아이템</h3>
      {ItemAdder(1)}
      <h3> 핵심 아이템</h3>
      {ItemAdder(2)}
      <Dialog
        onClose={() => {
          closeItemSelect();
        }}
        open={show}
      >
        <ItemListWithFilter
          onItemSelect={item => {
            selectItem(item);
          }}
          onFilterUpdate={filter => {
            setFilter(filter);
          }}
          onOptionUpdate={isSmall => {
            setIsSmall(isSmall);
          }}
          defaultFilter={filter}
          defaultIsSmall={isSmall}
        />
      </Dialog>
      <Grid>
        <EditorWrite initialValue={editorData} onChange={setEditorData}></EditorWrite>
      </Grid>

      <Button variant='contained' onClick={() => saveData()}>
        저장
      </Button>
    </div>
  );
}
