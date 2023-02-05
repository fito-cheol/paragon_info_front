import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Checkbox, Typography } from '@mui/material';

import attributeLanguage from 'assets/item/attribute_language.json';
import './ItemFilter.scoped.scss';

interface ItemFilterProps {
  onUpdate: (value: AttributeCheck) => void;
  filterValue?: AttributeCheck | undefined;
}

const initChecker = {} as AttributeCheck;
for (const attribueObject of attributeLanguage) {
  initChecker[attribueObject.attribute_en as Attributes] = false;
}

export default function ItemFilter({ onUpdate, filterValue }: ItemFilterProps) {
  const [checker, setChecker] = useState<AttributeCheck>(filterValue || initChecker);

  useEffect(() => {
    onUpdate(checker);
  }, [checker]);

  function handleChange(isChecked: boolean, location: string) {
    setChecker(prev => {
      return { ...prev, [location]: isChecked };
    });
  }
  function itemChecker(changeValue: string, displayText: string) {
    return (
      <Grid xs='auto' container className='filter__item'>
        <Grid xs='auto'>
          <Checkbox
            checked={checker[changeValue] || false}
            onChange={e => handleChange(e.target.checked, changeValue)}
          />
        </Grid>
        <Grid xs='auto' container className='item__textWrapper'>
          <Typography className='item__text'>{displayText}</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className='filter__wrapper'>
      <Grid xs={12} container spacing={0}>
        <Grid xs={2} className='category' container>
          <Typography variant='h6' className='category__text'>
            물리 공격
          </Typography>
        </Grid>
        <Grid xs={10} container className='filter__line'>
          {itemChecker('PHYSICAL POWER', '물리 공격력')}
          {itemChecker('PHYSICAL PENETRATION', '물리 관통력')}
          {itemChecker('NULLIFIED PHYSICAL DEFENSE', '물리 방어력 무효화')}
          {itemChecker('CRITICAL RATE', '치명타 확률')}
          {itemChecker('ATTACK SPEED', '공격 속도')}
          {itemChecker('LIFE STEAL', '생명력 흡수')}
          {itemChecker('PHYSICAL VAMP', '물리 피해 흡혈')}
        </Grid>
      </Grid>
      <Grid xs={12} container spacing={0}>
        <Grid xs={2} container className='category'>
          <Typography variant='h6' className='category__text'>
            마법 공격
          </Typography>
        </Grid>
        <Grid xs={10} container className='filter__line'>
          {itemChecker('MAGICAL POWER', '마법 공격력')}
          {itemChecker('MAGICAL PENETRATION', '마법 관통력')}
          {itemChecker('NULLIFIED MAGICAL DEFENSE', '마법 방어력 무효화')}
          {itemChecker('MANA', '마나')}
          {itemChecker('MANA REGEN', '마나 재생')}
          {itemChecker('MAGICAL VAMP', '마법 피해 흡혈')}
        </Grid>
      </Grid>
      <Grid xs={12} container spacing={0}>
        <Grid xs={2} className='category' container>
          <Typography variant='h6' className='category__text'>
            방어
          </Typography>
        </Grid>
        <Grid xs={10} container className='filter__line'>
          {itemChecker('PHYSICAL DEFENSE', '물리 방어력')}
          {itemChecker('MAGICAL DEFENSE', '마법 방어력')}
          {itemChecker('HEALTH', '체력')}
          {itemChecker('HEALTH REGEN', '체력 재생')}
        </Grid>
      </Grid>
      <Grid xs={12} container spacing={0}>
        <Grid xs={2} className='category' container>
          <Typography variant='h6' className='category__text'>
            기타
          </Typography>
        </Grid>
        <Grid xs={10} container className='filter__line'>
          {itemChecker('TENACITY', '군중 제어 저항')}
          {itemChecker('COOLDOWN REDUCTION', '재사용 대기 시간 감소')}
          {itemChecker('MOVEMENT SPEED', '이동 속도')}
          {itemChecker('HEALING REDUCTION', '치유량 감소')}
          {itemChecker('SLOW', '둔화')}
        </Grid>
      </Grid>
    </Grid>
  );
}
