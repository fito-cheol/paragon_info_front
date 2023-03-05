import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
interface Props {
  review: google.maps.places.PlaceReview;
}

export default function Reviews({ review }: Props) {
  return (
    <Card
      className='place__card'
      sx={{
        backgroundColor: theme => theme.palette.background.default,
      }}
    >
      <CardContent>
        <Grid container>
          <Grid xs={12}>
            <img width={14} height={14} src='https://maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png' />
            {review.rating}
          </Grid>
          <Grid xs={12}>{review.text}</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
