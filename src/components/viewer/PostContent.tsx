import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import EditorRead from 'components/post/EditorRead';

interface Props {
  content: Content;
}

export default function PostTable({ content }: Props) {
  const { id, hero_FK, skill_list, start_item_list, end_item_list, possible_item_list, text } = content;

  useEffect(() => {
    console.log('content가 변경되었습니다', text);
  }, [content]);

  return (
    <Grid container>
      <Grid xs={12}>
        <EditorRead content={text} />
      </Grid>
    </Grid>
  );
}
