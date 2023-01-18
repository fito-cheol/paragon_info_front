import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import ImageHeros from 'assets/hero/imagePreloaderHero';
import ImageHeroTypes from 'assets/hero/imagePreloaderType';

import HeroJson from 'assets/hero/DB_Hero.json';

import './FullCard.scoped.scss';

export default function List() {
  const [heroList, setHeroList] = useState<Hero[]>([]);
  console.log('HeroJson', HeroJson);
  console.log('ImageHeros', ImageHeros);
  useEffect(() => {
    setHeroList(HeroJson);
  }, []);

  return (
    <>
      <section className='content'>
        {heroList.map(hero => (
          <Card key={hero.name} className='fullCard' sx={{ maxWidth: 208 }}>
            <CardMedia
              className='fullCardMedia'
              component='img'
              width='208'
              height='320'
              image={ImageHeros[hero.name]}
              alt={hero.이름}
            />
            <CardContent className='fullCardContent'>
              <CardMedia
                className='iconImage'
                image={ImageHeroTypes[hero.category]}
                component='img'
                alt={hero.category}
                sx={{ width: 45 }}
              />
              <Typography className='fullCardTypography' variant='h5' component='div'>
                {hero.이름}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
