import React, { useState } from 'react';

import { Button } from '@mui/material';
import './Input.scoped.scss';

interface Props {
  initialText: string;
  isTextareaDisabled: boolean;
  submitLabel: string;
  hasCancelButton?: boolean;
  handleCancel?: () => void;
  onSubmit: (text: string) => void;
}

export default function CommentInput({
  initialText,
  isTextareaDisabled,
  submitLabel,
  hasCancelButton,
  handleCancel,
  onSubmit,
}: Props) {
  const [text, setText] = useState<string>(initialText);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(text);
        setText('');
      }}
    >
      <input type='text' className='comment__input' value={text} onChange={e => setText(e.target.value)} />
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
    </form>
  );
}
