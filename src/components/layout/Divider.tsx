import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';

export default function CustomDivider() {
  return (
    <Grid xs={12} sx={{ marginTop: '12px', marginBottom: '12px' }}>
      <Divider className='divider' variant='middle' />
    </Grid>
  );
}
