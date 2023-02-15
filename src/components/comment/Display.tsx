import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { dateParser } from 'utils/parsing';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  comment: Comment;
  onClick?: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
}

function DeletedComment() {
  return (
    <Grid
      container
      sx={{ paddingTop: 1, paddingBottom: 1, borderBottom: '1px solid', borderColor: 'rgba(100,100,100,0.5)' }}
    >
      <h3> 삭제된 댓글 입니다 </h3>
    </Grid>
  );
}

export default function CommentShow({ comment, onClick, onDelete }: Props) {
  if (comment.deleted) {
    return DeletedComment();
  }

  return (
    <Grid
      container
      sx={{ paddingTop: 1, paddingBottom: 1, borderBottom: '1px solid', borderColor: 'rgba(100,100,100,0.5)' }}
    >
      <Grid xs='auto' container sx={{ marginRight: 2 }}>
        <img
          src={comment.user.picture}
          width={50}
          height={50}
          style={{ borderRadius: '50%', cursor: 'pointer' }}
          loading='lazy'
          alt={`user_picture_${comment.user.full_name}`}
        ></img>
      </Grid>
      <Grid xs container>
        <Grid xs={12}>
          {comment.user.full_name}, {dateParser(comment.date)}
        </Grid>
        <Grid
          xs={12}
          onClick={() => {
            if (onClick) {
              onClick(comment);
            }
          }}
        >
          <div>{comment.text} </div>
        </Grid>
      </Grid>
      <Grid xs={2} container justifyContent={'end'}>
        <IconButton aria-label='delete' onClick={() => onDelete(comment)}>
          <DeleteIcon color='warning' />
        </IconButton>
      </Grid>
    </Grid>
  );
}
