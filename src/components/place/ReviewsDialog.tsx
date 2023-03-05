import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2';
import { toast } from 'react-toastify';

import Gallery from 'components/image/ImageGallery';
import Reviews from './Reviews';
import { minHeight } from '@mui/system';

interface Props {
  open: boolean;
  onClose: () => void;
  reviews: google.maps.places.PlaceReview[];
  photos: google.maps.places.PlacePhoto[];
  name: string;
  address: string;
  openingHour: google.maps.places.PlaceOpeningHours | undefined;
}

export default function ReviewsDialog({ open, onClose, reviews, photos, name, openingHour, address }: Props) {
  const [openStatus, setOpenStatus] = useState<string>('영업중');

  useEffect(() => {
    getOpenStatus();
  }, [openingHour]);

  async function getOpenStatus() {
    if (openingHour) {
      const isOpen = openingHour.open_now;
      if (isOpen) {
        setOpenStatus('영업중');
      } else {
        setOpenStatus('영업종료');
      }
    }
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{`${name} - ${openStatus}`}</DialogTitle>
      <DialogContent>
        <Grid container style={{ minWidth: 540 }}>
          {photos ? (
            <Grid xs={12} style={{ minHeight: 540 }}>
              <Gallery images={photos} />
            </Grid>
          ) : (
            <Grid xs={12}>
              <h3>리뷰 사진 없음</h3>
            </Grid>
          )}
          {openingHour ? (
            <Grid xs={12}>
              {openingHour.weekday_text?.map((text, index) => {
                return <li key={index}> {text}</li>;
              })}
            </Grid>
          ) : (
            <></>
          )}
          {reviews ? (
            reviews.map((review, index) => {
              return (
                <Grid xs={12} key={index}>
                  <Reviews review={review} />
                </Grid>
              );
            })
          ) : (
            <Grid xs={12}>
              <h3>리뷰 댓글 없음</h3>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          size='small'
          onClick={() => {
            window.navigator.clipboard.writeText(name);
            toast.info('가게 이름 복사 완료');
          }}
        >
          가게 이름 복사
        </Button>
        <Button
          variant='contained'
          size='small'
          onClick={() => {
            window.navigator.clipboard.writeText(address);
            toast.info('주소 복사 완료');
          }}
        >
          주소 복사
        </Button>
      </DialogActions>
    </Dialog>
  );
}
