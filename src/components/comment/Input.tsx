import React, { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import { Button } from '@mui/material';
import './Input.scoped.scss';

interface Props {
  text: string;
  onChange: (text: string) => void;
  isTextareaDisabled: boolean;
  submitLabel: string;
  hasCancelButton?: boolean;
  handleCancel?: () => void;
  onSubmit: (text: string) => void;
}

export default function CommentInput({
  text,
  onChange,
  isTextareaDisabled,
  submitLabel,
  hasCancelButton,
  handleCancel,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(text);
      }}
      className='wrapper'
    >
      <div className='comment__input--wrapper'>
        <input type='text' className='comment__input' value={text} onChange={e => onChange(e.target.value)} />
      </div>
      <Grid container xs={12} alignContent='center' justifyContent='end' className='button--wrapper'>
        <Button type='submit' variant='contained' className='comment__button' disabled={isTextareaDisabled}>
          {submitLabel}
        </Button>
        {hasCancelButton && (
          <Button
            variant='contained'
            className='comment__button comment__button--cancel'
            onClick={() => {
              if (handleCancel) handleCancel();
            }}
          >
            취소
          </Button>
        )}
      </Grid>
    </form>
  );
}
