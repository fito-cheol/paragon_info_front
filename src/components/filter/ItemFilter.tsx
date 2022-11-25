import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Checkbox from '@mui/material/Checkbox';
import attributeLanguage from '../../assets/item/attribute_language.json';
import { Attributes, AttributeCheck } from '../../utils/commonTypes';

interface ItemFilterProps {
  onUpdate: (value: AttributeCheck) => void;
}

const initChecker = {} as AttributeCheck;
for (const attribueObject of attributeLanguage) {
  initChecker[attribueObject.attribute_en as Attributes] = false;
}

export default function ItemFilter({ onUpdate }: ItemFilterProps) {
  const [checker, setChecker] = useState<AttributeCheck>(initChecker);
  function handleChange(isChecked: boolean, location: string) {
    setChecker(prev => {
      return { ...prev, [location]: isChecked };
    });
    onUpdate(checker);
  }
  return (
    <Grid container className='filterWrapper'>
      <Grid xs={2} className='category'>
        물리 공격
      </Grid>
      <Grid xs={10} container>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'PHYSICAL POWER')} />
          물리 공격력
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'PHYSICAL PENETRATION')} />
          물리 관통력
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'NULLIFIED PHYSICAL DEFENSE')} />
          물리 방어력 무효화
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'CRITICAL RATE')} />
          치명타 확률
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'ATTACK SPEED')} />
          공격 속도
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'LIFE STEAL')} />
          생명력 흡수
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'PHYSICAL VAMP')} />
          물리 피해 흡혈
        </Grid>
      </Grid>
      <Grid xs={2} className='category'>
        마법 공격
      </Grid>
      <Grid xs={10} container>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'MAGICAL POWER')} />
          마법 공격력
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'MAGICAL PENETRATION')} />
          마법 관통력
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'NULLIFIED MAGICAL DEFENSE')} />
          마법 방어력 무효화
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'MANA')} />
          마나
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'MANA REGEN')} />
          마나 재생
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'MAGICAL VAMP')} />
          마법 피해 흡혈
        </Grid>
      </Grid>
      <Grid xs={2} className='category'>
        방어
      </Grid>
      <Grid xs={10} container>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'PHYSICAL DEFENSE')} />
          물리 방어력
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'MAGICAL DEFENSE')} />
          마법 방어력
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'HEALTH')} />
          체력
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'HEALTH REGEN')} />
          체력 재생
        </Grid>
      </Grid>
      <Grid xs={2} className='category'>
        기타
      </Grid>
      <Grid xs={10} container>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'TENACITY')} />
          군중 제어 저항
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'COOLDOWN REDUCTION')} />
          재사용 대기 시간 감소
        </Grid>
        <Grid xs='auto' className='filterItem'>
          <Checkbox onChange={e => handleChange(e.target.checked, 'MOVEMENT SPEED')} />
          이동 속도
        </Grid>
      </Grid>
    </Grid>
  );
}
