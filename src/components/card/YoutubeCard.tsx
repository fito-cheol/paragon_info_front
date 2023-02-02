import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './YoutubeCard.scoped.scss';

interface Props {
  youtubeData: YoutubeFormat;
}

export default function YoutubeCard({ youtubeData }: Props) {
  return (
    <Card
      sx={{ width: 320, height: 380 }}
      onClick={() => {
        window.open(youtubeData.url, '_blank', 'scrollbars=yes,status=yes');
      }}
      className='youtube__card'
    >
      <CardMedia component='img' height={180} image={youtubeData.thumbnailUrl} />
      <CardContent>
        <Typography className='youtube__title' gutterBottom variant='subtitle1' component='div'>
          {youtubeData.title}
        </Typography>
        <p className='youtube__description'>{youtubeData.description}</p>
      </CardContent>
    </Card>
  );
}
