import React, { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import Button from 'components/button/ColoredButton';
import CustomDivider from 'components/layout/Divider';

import AutoHero from 'components/input/autocompleteHero';

interface Props {
  applyFilter: (heroName: string | null) => void;
}

export default function PostFilter({ applyFilter }: Props) {
  const [selectedHeroInfo, setSelectedHeroInfo] = useState<AutocompleteOption | null>(null);

  return (
    <Grid container xs={12}>
      <CustomDivider />
      <Grid xs={2} container justifyContent={'center'}>
        <h3>챔피언 </h3>
      </Grid>
      <Grid xs={10} container alignContent={'center'}>
        <AutoHero value={selectedHeroInfo} onChange={setSelectedHeroInfo} />
      </Grid>
      <Grid
        xs={12}
        className='filter__button--row'
        marginTop={1}
        container
        alignContent='center'
        justifyContent='center'
        spacing={2}
      >
        <Grid xs='auto'>
          <Button onClick={() => applyFilter(selectedHeroInfo?.id || null)}> 필터 적용하기</Button>
        </Grid>
        <Grid xs='auto'>
          <Button> 필터 초기화</Button>
        </Grid>
      </Grid>
      <CustomDivider />
    </Grid>
  );
}
