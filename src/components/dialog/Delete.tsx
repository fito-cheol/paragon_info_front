import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DialogDelete({ open, onConfirm, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'댓글 삭제'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>댓글을 삭제하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' size='small' color='error' onClick={onConfirm} autoFocus>
          확인
        </Button>
        <Button variant='outlined' size='small' onClick={onClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
