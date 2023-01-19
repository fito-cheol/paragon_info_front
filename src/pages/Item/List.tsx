import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import ItemListWithFilter from 'components/combined/ItemListWithFilter';

export default function List() {
  return (
    <Grid container xs={12}>
      <Grid xs={12} container>
        <h1> 아이템 </h1>
      </Grid>
      <Grid xs={12} container>
        <ItemListWithFilter />
      </Grid>
    </Grid>
  );
}
