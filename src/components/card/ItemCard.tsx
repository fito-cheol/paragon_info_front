import { Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';
import React, { useState } from 'react';

type Item = {
  이름: string;
  name: string;
  카테고리A: string;
  일회성: string;
  가격: number;
  '사용 효과 (w. tag)': string;
  '사용 효과': string;
  '사용 효과 쿨타임': number | string;
  '지속 효과 (w. tag)': string;
  '지속 효과': string;
  '지속 효과 쿨타임': number | string;
  '물리 공격력': number | string;
  '물리 관통력': number | string;
  '물리 방어력 무효화': number | string;
  마법공격력: number | string;
  '마법 관통력': number | string;
  '마법 방어력 무효화': number | string;
  '치명타 확률': number | string;
  '공격 속도': number | string;
  '생명력 흡수': number | string;
  '물리 피해 흡혈': number | string;
  '마법 피해 흡혈': number | string;
  '모든 피해 흡혈': number | string;
  '물리 방어력': number | string;
  '마법 방어력': number | string;
  체력: number | string;
  마나: number | string;
  '체력 재생': number | string;
  '마나 재생': number | string;
  '군중 제어 저항': number | string;
  '재사용 대기 시간 감소': number | string;
  '이동 속도': number | string;
  '골드 가치': number;
  하위템_List: string;
  '이미지 path': string;
};

export interface IItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: IItemCardProps) {
  const imagePath = `../../../assets/item/ITEM_IMAGE/${item.name}.png`;
  console.log(imagePath);
  return (
    <Card>
      <CardHeader avatar={<Avatar alt={item.name} src={imagePath} sx={{ width: 24, height: 24 }} />} />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
          frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}
