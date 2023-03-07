import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import './PlaceDetail.scoped.scss';

interface Props {
  placeInfo: google.maps.places.PlaceResult;
  onClick?: (placeInfo: google.maps.places.PlaceResult) => void;
  onHover: (placeInfo: google.maps.places.PlaceResult) => void;
  onHoverEnd?: () => void;
}

const PlaceDetails = ({ placeInfo, onClick, onHover, onHoverEnd }: Props) => {
  return (
    <Card
      className='place__card'
      sx={{
        backgroundColor: theme => theme.palette.background.default,
      }}
      onMouseEnter={() => onHover(placeInfo)}
      onMouseLeave={() => {
        if (onHoverEnd) onHoverEnd();
      }}
    >
      {placeInfo.photos ? (
        <CardMedia
          component='img'
          image={placeInfo.photos[0].getUrl()}
          alt={placeInfo.name}
          loading='lazy'
          className='card__image'
        />
      ) : (
        <></>
      )}

      <CardContent>
        <Grid
          container
          spacing={2}
          justifyContent='center'
          onClick={() => {
            if (onClick) {
              onClick(placeInfo);
            }
          }}
          className='place__name--row'
        >
          <Grid xs='auto'>
            <p className='place__name--text'>{placeInfo.name}</p>
          </Grid>
          <Grid xs='auto' alignItems='center' sx={{ display: 'flex' }}>
            <p className='place__name--rating' style={{ textAlign: 'center' }}>
              <img
                className='img--star'
                width={14}
                height={14}
                src='https://maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png'
              />
              {placeInfo.rating} ({placeInfo.user_ratings_total})
            </p>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
