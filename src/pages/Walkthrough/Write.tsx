import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import { Item, ItemList, AttributeCheck } from '../../utils/commonTypes';
import EditorWrite from '../../components/post/EditorWrite';
import AutoHero from '../../components/input/autocompleteHero';
import SkillTree from '../../components/image/SkillTree';
import ImageItem from '../../components/image/Item';
import ImageItemList from '../../components/image/ItemList';
import ItemListWithFilter from '../../components/combined/ItemListWithFilter';

import itemJson from '../../assets/item/item_db.json';
import './Write.scoped.scss';

type SkillTreeType = 'Q' | 'E' | 'R' | 'Right' | 'None';

export default function Write() {
  const [skillTreeArray, setSkillTreeArray] = useState<SkillTreeType[]>([]);
  const [skillTreeElements, setSkillTreeElements] = useState<JSX.Element[]>([<div key={1}></div>]);
  const [itemList, setItemList] = useState<ItemList>([]);
  const [itemListElements, setItemListElements] = useState<JSX.Element[]>([<div key={1}></div>]);
  const [clickedRow, setClickedRow] = useState<number>(-1);
  const [show, setShow] = useState<boolean>(false);
  const [selectedItemList, setSelectedItemList] = useState<ItemList[]>([[], [], []]);
  const [isSmall, setIsSmall] = useState<boolean>(true);
  const [filter, setFilter] = useState<AttributeCheck | undefined>(undefined);

  // onMount
  useEffect(() => {
    const initialArray = Array(18).fill('None');
    setSkillTreeArray(initialArray);
    setItemList(itemJson);
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
    setItemListElements(
      itemList.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              selectItem(item);
            }}
          >
            <ImageItem item={item} />
          </div>
        );
      }),
    );
  }, [itemListElements]);

  useEffect(() => {
    setShow(clickedRow >= 0);
  }, [clickedRow]);

  useEffect(() => {
    console.log(selectedItemList);
  }, [selectedItemList]);

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
  const closeItemSelect = () => {
    setClickedRow(-1);
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
      <h3> 시작 아이템</h3>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
        onClick={() => addItemButtonHandler(0)}
      >
        <AddIcon />
      </IconButton>
      <ImageItemList itemList={selectedItemList[0]} />
      <h3> 최종 아이템</h3>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
        onClick={() => addItemButtonHandler(1)}
      >
        <AddIcon />
      </IconButton>
      <ImageItemList itemList={selectedItemList[1]} />
      <h3> 핵심 아이템</h3>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
        onClick={() => addItemButtonHandler(2)}
      >
        <AddIcon />
      </IconButton>
      <ImageItemList itemList={selectedItemList[2]} />
      <Grid className={show ? undefined : 'hidden'} container>
        <IconButton
          size='large'
          edge='start'
          color='error'
          aria-label='menu'
          sx={{ mr: 2 }}
          onClick={() => closeItemSelect()}
        >
          <ClearIcon />
        </IconButton>
        {itemListElements}
      </Grid>
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
            console.log('filter update Write');
            setFilter(filter);
          }}
          onOptionUpdate={isSmall => {
            setIsSmall(isSmall);
          }}
          defaultFilter={filter}
          defaultIsSmall={isSmall}
        />
      </Dialog>
      <EditorWrite></EditorWrite>
    </div>
  );
}
