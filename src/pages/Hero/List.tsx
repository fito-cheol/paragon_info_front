import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import ImageHeros from 'assets/hero/imagePreloaderHero';
import ImageHeroTypes from 'assets/hero/imagePreloaderType';

import HeroJson from 'assets/hero/DB_Hero.json';
import { useNavigate } from 'react-router-dom';

import './List.scoped.scss';

export default function List() {
  const [heroList, setHeroList] = useState<Hero[]>([]);
  useEffect(() => {
    setHeroList(HeroJson);
  }, []);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>, pathname: string) => {
    if (event.ctrlKey) {
      window.open(pathname, '_blank');
    } else {
      navigate({ pathname });
    }
  };

  return (
    <>
      <section className='content'>
        {heroList.map(hero => (
          <Card
            key={hero.name}
            className='fullCard'
            sx={{ maxWidth: 208 }}
            onClick={event => handleClick(event, `/hero/${hero.name}`)}
          >
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
