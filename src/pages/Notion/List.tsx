import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import ImageHeros from 'assets/hero/imagePreloaderHero';
import ImageHeroTypes from 'assets/hero/imagePreloaderType';

import heroDictByPosition from 'assets/hero/heroDictByPosition';
import { useNavigate } from 'react-router-dom';
import notionByHero from 'assets/hero/Notion_Hero.json';
import './List.scoped.scss';

const position_kr_list = ['탑', '정글', '미드', '원딜', '서폿'];
const position_key_list = ['top', 'jungle', 'mid', 'adc', 'support'];

type NOTION_HERO = {
  [index: string]:string
}

export default function NotionList() {
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
        {position_key_list.map((position_key, index) => (
          <div key={position_key}>
            <h1 style={{paddingLeft:"10px"}}> {position_kr_list[index]} </h1>
            <section className='content'> 
              {heroDictByPosition[position_key].map((hero:Hero) => {
                return <HeroCard hero={hero} key={hero.name} onClick={(event, path) => handleClick(event, path)} />
              })}
          </section>
          </div>
        ))}
      </section>
    </>
  );
}

interface HeroCardProps{
  hero:Hero,
  onClick: (event: React.MouseEvent<Element, MouseEvent>, pathname: string)=> void
}

function HeroCard({hero, onClick}:HeroCardProps){
  const notionId = (notionByHero as NOTION_HERO)[hero.name]
  return (
          <Card
            key={hero.name}
            className='fullCard'
            sx={{ maxWidth: 170 }}
            onClick={event => onClick(event, `/walkthrough/${notionId}`)}
          >
            <CardMedia
              className='fullCardMedia'
              component='img'
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
        )
}