import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

type ButtonProps = {
  canModify: boolean;
  canDelete: boolean;
  onModify?: () => void;
  onDelete?: () => void;
  onWrite?: () => void;
};

export default function PostButtonList({ canModify, canDelete, onModify, onDelete, onWrite }: ButtonProps) {
  return (
    <Grid container justifyContent={'end'} spacing={1}>
      {canModify ? (
        <Grid xs='auto'>
          <Button
            variant='contained'
            onClick={() => {
              if (onModify) onModify();
            }}
          >
            수정
          </Button>
        </Grid>
      ) : (
        <></>
      )}
      {canDelete ? (
        <Grid xs='auto'>
          <Button
            variant='contained'
            onClick={() => {
              if (onDelete) onDelete();
            }}
            color='error'
          >
            삭제
          </Button>
        </Grid>
      ) : (
        <></>
      )}
      <Grid xs='auto'>
        <Button
          variant='contained'
          onClick={() => {
            if (onWrite) onWrite();
          }}
        >
          글쓰기
        </Button>
      </Grid>
    </Grid>
  );
}
