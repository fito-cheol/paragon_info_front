import React, { ReactNode } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { dateParser } from 'utils/parsing';

interface Props {
  comment: Comment;
  onClick?: (comment: Comment) => void;
}

export default function CommentShow({ comment }: Props) {
  return (
    <Grid container sx={{ marginBottom: 2 }}>
      <Grid xs='auto' container sx={{ marginRight: 2 }}>
        <img src={comment.user.picture} width={50} height={50} style={{ borderRadius: '50%', cursor: 'pointer' }}></img>
      </Grid>
      <Grid xs container>
        <Grid xs={12}>
          {comment.user.full_name}, {dateParser(comment.date)}
        </Grid>
        <Grid xs={12}>{comment.text}</Grid>
      </Grid>
    </Grid>
  );
}
