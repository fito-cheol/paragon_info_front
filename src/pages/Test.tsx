import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import ReactQuerySample from 'components/reactQuerySample';
export default function Test() {
  return (
    <Grid container>
      <Grid xs={12}>
        <ReactQuerySample />
      </Grid>
    </Grid>
  );
}
