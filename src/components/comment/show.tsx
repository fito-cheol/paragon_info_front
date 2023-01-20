import React, { ReactNode } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

interface Props {
  comment: Comment;
  onClick?: (comment: Comment) => void;
}

export default function CommentShow({ comment }: Props) {
  return (
    <Grid container>
      <Grid xs='auto'> 사진</Grid>
      <Grid xs container>
        <Grid xs={12}>아이디, 날짜</Grid>
        <Grid xs={12}>댓글</Grid>
      </Grid>
    </Grid>
  );
}
