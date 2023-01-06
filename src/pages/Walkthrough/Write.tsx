import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';

import type { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

import { toast } from 'react-toastify';

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

import { getPost, modifyPost } from 'api/post/index';
import { useMutation } from 'react-query';
import { upload } from 'api/post/index';

import heroList from 'assets/hero/DB_Hero.json';
import itemDict from 'assets/item/itemDict';
import heroImages from 'assets/hero/imagePreloaderHero';
import './Write.scoped.scss';

interface AutocompleteOption {
  label: string;
  id: string;
}

export default function Write() {
  const navigate = useNavigate();
  const location = useLocation();
  const { no } = useParams();
  const isModify = _.startsWith(location.pathname, '/modify');

  const user = useAppSelector((state: RootState) => state.user.user);

  const [title, setTitle] = useState<string>('');
  const [skillTreeArray, setSkillTreeArray] = useState<SkillTree[]>([]);
  const [skillTreeElements, setSkillTreeElements] = useState<JSX.Element[]>([<div key={1}></div>]);
  const [clickedRow, setClickedRow] = useState<number>(-1);
  const [show, setShow] = useState<boolean>(false);
  const [selectedItemList, setSelectedItemList] = useState<Item[][]>([[], [], []]);
  const [isSmall, setIsSmall] = useState<boolean>(true);
  const [filter, setFilter] = useState<AttributeCheck | undefined>(undefined);
  const [editorData, setEditorData] = useState<string>(' ');
  const [selectedHeroInfo, setSelectedHeroInfo] = useState<AutocompleteOption | null>(null);

  const postMutation = useMutation(getPost, {
    onSuccess: post => {
      const { title } = post.post;
      setTitle(title);
      const { skill_list, end_item_list, start_item_list, possible_item_list, text } = post.content;
      const newSkillTreeArray = skill_list.split(',') as SkillTree[];
      setSkillTreeArray(newSkillTreeArray);

      let newItemKeyArray = start_item_list.split(',');
      const newStartItems = newItemKeyArray.map(itemKey => itemDict[itemKey]).filter(e => e);

      newItemKeyArray = end_item_list.split(',');
      const newEndItems = newItemKeyArray.map(itemKey => itemDict[itemKey]).filter(e => e);

      newItemKeyArray = possible_item_list.split(',');
      const newPossibleItems = newItemKeyArray.map(itemKey => itemDict[itemKey]).filter(e => e);

      setSelectedItemList([newStartItems, newEndItems, newPossibleItems]);
      setEditorData(text);

      _.forEach(heroList, heroInfo => {
        if (heroInfo.name) {
          setSelectedHeroInfo({ label: heroInfo['이름'], id: heroInfo.name });
        }
      });
    },
  });

  useEffect(() => {
    const initialArray = Array(18).fill('None');
    setSkillTreeArray(initialArray);

    if (isModify) {
      postMutation.mutate({ postId: Number(no) });
    }
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
    // 로그인 되어 있는지 확인하고 로그인할것
    if (!user) {
      toast.error('로그인이 필요한 기능입니다');
      return;
    }

    // FIXME: form validation check 할것
    if (selectedHeroInfo == null) {
      console.warn('선택된 영웅이 없습니다');
      return;
    } else if (isModify && no) {
      const exportData = {
        postId: Number(no),
        heroName: selectedHeroInfo.id,
        skillTree: skillTreeArray,
        startItems: selectedItemList[0].map(item => item.name),
        endItems: selectedItemList[1].map(item => item.name),
        possibleItems: selectedItemList[2].map(item => item.name),
        text: editorData,
        title: title,
      };
      await modifyPost(exportData);
      toast.info('게시물 수정 완료');
      navigate('/list', { replace: false });
    } else {
      const exportData = {
        heroName: selectedHeroInfo.id,
        skillTree: skillTreeArray,
        startItems: selectedItemList[0].map(item => item.name),
        endItems: selectedItemList[1].map(item => item.name),
        possibleItems: selectedItemList[2].map(item => item.name),
        text: editorData,
        title: title,
      };
      await upload(exportData);
      toast.info('게시물 저장 완료');
      navigate('/list', { replace: false });
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
    <Grid container>
      <Grid xs={12}>
        <h1> {isModify ? '공략 수정' : '공략 작성'} </h1>
      </Grid>
      <Grid xs={12} container>
        <Grid xs={6} md={4} lg={3}>
          <TextField
            fullWidth
            id='title'
            label='제목'
            variant='outlined'
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid xs={12}>
        <h1> 영웅 </h1>
      </Grid>
      {selectedHeroInfo ? (
        <Grid xs={12}>
          <img src={heroImages[selectedHeroInfo?.id]} loading='lazy' width={100} height={100} />
        </Grid>
      ) : (
        <></>
      )}
      <Grid xs={12}>
        <AutoHero value={selectedHeroInfo} onChange={setSelectedHeroInfo} />
      </Grid>

      <Grid xs={12}>
        <h1> 스킬트리 </h1>
      </Grid>
      <Grid xs={12} container>
        <Grid xs={12}>
          <SkillTree type='Q' onClick={() => addSkillTree('Q')} />
          <SkillTree type='E' onClick={() => addSkillTree('E')} />
          <SkillTree type='R' onClick={() => addSkillTree('R')} />
          <SkillTree type='Right' onClick={() => addSkillTree('Right')} />
        </Grid>
        <Grid xs={12}>{skillTreeElements}</Grid>
      </Grid>
      <Grid xs={12}>
        <h1> 아이템 </h1>
      </Grid>
      <Grid xs={12}>
        <h3> 시작 아이템</h3>
      </Grid>
      <Grid xs={12}>{ItemAdder(0)}</Grid>
      <Grid xs={12}>
        <h3> 최종 아이템</h3>
      </Grid>
      <Grid xs={12}>{ItemAdder(1)}</Grid>
      <Grid xs={12}>
        <h3> 핵심 아이템</h3>
      </Grid>
      <Grid xs={12}>{ItemAdder(2)}</Grid>
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
      <Grid xs={12}>
        <EditorWrite value={editorData} onChange={setEditorData}></EditorWrite>
      </Grid>
      <Grid container justifyContent={'flex-end'} xs={12}>
        <Button variant='contained' onClick={() => saveData()}>
          {isModify ? '수정' : '저장'}
        </Button>
      </Grid>
    </Grid>
  );
}
