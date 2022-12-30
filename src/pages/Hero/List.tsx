import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import images from 'assets/hero/imagePreloaderHero';
import imageHeroTypes from 'assets/hero/imagePreloaderType';

import './FullCard.scoped.scss';

export default function List() {
  return (
    <>
      <section>
        <Card className='fullCard' sx={{ maxWidth: 208 }}>
          <CardMedia
            className='fullCardMedia'
            component='img'
            height='320'
            image={images['Aurora']}
            alt='영웅 오로라'
          />
          <CardContent className='fullCardContent'>
            <CardMedia
              className='iconImage'
              image={imageHeroTypes['Wizard_white']}
              component='img'
              alt='영웅 타입'
              sx={{ width: 45 }}
            />
            <Typography className='fullCardTypography' variant='h5' component='div'>
              영웅이름
            </Typography>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
