import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import discordLogoImage from 'assets/icon/discord-logo.png';
import CustomDivider from 'components/layout/Divider';
export default function ContactInfo() {
  return (
    <footer>
      <Grid container>
        <CustomDivider />
        <Grid className='contact__row' style={{ paddingLeft: '20px' }} xs={12}>
          <div style={{ display: 'flex' }}>
            <p style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '0px' }}> Contact </p>
          </div>
          <div style={{ display: 'flex' }}>
            <img
              style={{ marginTop: 'auto', marginBottom: 'auto' }}
              className='contact__img'
              title='discord'
              alt='discord'
              loading='lazy'
              src={discordLogoImage}
              width={30}
              height={30}
            />
            <p> 배부른곰이#2803 </p>
          </div>
          <div>
            <p> release version: 0.2.1 </p>
          </div>
        </Grid>
        <Grid className='contact__row' xs={12}></Grid>
      </Grid>
    </footer>
  );
}
