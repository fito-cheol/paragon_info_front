import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import ReduxSample from 'components/reduxSample';
import ReduxAxiosSample from 'components/reduxAxiosSample';
import ReactQuerySample from 'components/reactQuerySample';
export default function Test() {
  return (
    <Grid container>
      <Grid xs={12}>
        <ReduxSample />
      </Grid>
      <Grid xs={12}>
        <ReduxAxiosSample />
      </Grid>
      <Grid xs={12}>
        <ReactQuerySample />
      </Grid>
    </Grid>
  );
}
