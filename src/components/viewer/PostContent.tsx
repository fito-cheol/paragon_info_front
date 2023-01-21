import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import EditorRead from 'components/post/EditorRead';
import SkillTree from 'components/image/SkillTree';
import ImageItemList from 'components/image/ItemList';
import CustomDivider from 'components/layout/Divider';

import heroImages from 'assets/hero/imagePreloaderHero';
import heroDict from 'assets/hero/heroDict';

import './PostContent.scoped.scss';
import itemDict from 'assets/item/itemDict';

interface Props {
  post: Post;
  content: Content;
}

export default function PostTable({ post, content }: Props) {
  const { hero_FK, skill_list, start_item_list, end_item_list, possible_item_list, text } = content;
  const [skillTreeArray, setSkillTreeArray] = useState<SkillTree[]>([]);
  const [dateString, setDateString] = useState<string>('');
  const [startItems, setStartItems] = useState<Item[]>([]);
  const [endItems, setEndItems] = useState<Item[]>([]);
  const [possibleItems, setPossibleItems] = useState<Item[]>([]);

  // mounted
  useEffect(() => {
    const newSkillTreeArray = skill_list.split(',') as SkillTree[];
    setSkillTreeArray(newSkillTreeArray);
  }, [skill_list]);

  useEffect(() => {
    let newItemKeyArray = start_item_list.split(',');
    const newStartItems = newItemKeyArray.map(itemKey => itemDict[itemKey]).filter(e => e);
    setStartItems(newStartItems);

    newItemKeyArray = end_item_list.split(',');
    const newEndItems = newItemKeyArray.map(itemKey => itemDict[itemKey]).filter(e => e);
    setEndItems(newEndItems);

    newItemKeyArray = possible_item_list.split(',');
    const newPossibleItems = newItemKeyArray.map(itemKey => itemDict[itemKey]).filter(e => e);
    setPossibleItems(newPossibleItems);
  }, [start_item_list, end_item_list, possible_item_list]);

  useEffect(() => {
    const postDate: Date = new Date(Date.parse(post.create_date));
    const newDateString = `${postDate.getFullYear()}.${
      postDate.getMonth() + 1
    }.${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}`;
    setDateString(newDateString);
  }, [post]);

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography variant='h3'> {post.title} </Typography>
      </Grid>
      <Grid container xs={12} justifyContent='space-between'>
        <Grid xs='auto'>
          <Typography> {dateString} </Typography>
        </Grid>
        <Grid xs='auto'>
          <Typography> 조회수 {post.click_count} </Typography>
        </Grid>
      </Grid>
      <CustomDivider />
      <Grid container>
        <Grid xs={12}>
          <Typography variant='h4'>영웅 정보</Typography>
        </Grid>
        <Grid xs='auto'>
          <img src={heroImages[hero_FK]} alt={hero_FK} loading='lazy' width={100} height={100} />
        </Grid>
        <Grid xs={12}>
          <Typography variant='h5'> {heroDict[hero_FK]['이름']} </Typography>
        </Grid>
      </Grid>
      <CustomDivider />
      <Grid xs={12}>
        <Typography variant='h4'>스킬 트리</Typography>
      </Grid>
      {skillTreeArray.map((skillTreeElement, index) => {
        return <SkillTree key={index} type={skillTreeElement} />;
      })}
      <CustomDivider />
      <Grid xs={12}>
        <Typography variant='h4'>시작 아이템</Typography>
      </Grid>
      <Grid xs={12}>{startItems.length > 0 ? <ImageItemList itemList={startItems} /> : <h3> 아이템 없음 </h3>}</Grid>
      <CustomDivider />
      <Grid xs={12}>
        <Typography variant='h4'>최종 아이템</Typography>
      </Grid>
      <Grid xs={12}>{endItems.length > 0 ? <ImageItemList itemList={endItems} /> : <h3> 아이템 없음 </h3>}</Grid>
      <CustomDivider />
      <Grid xs={12}>
        <Typography variant='h4'>핵심 아이템</Typography>
      </Grid>
      <Grid xs={12}>
        {possibleItems.length > 0 ? <ImageItemList itemList={possibleItems} /> : <h3> 아이템 없음 </h3>}
      </Grid>
      <Grid xs={12} sx={{ minHeight: '300px', padding: '10px', border: '1px solid grey' }}>
        <EditorRead content={text} />
      </Grid>
    </Grid>
  );
}
