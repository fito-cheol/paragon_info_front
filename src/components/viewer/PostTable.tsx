import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import * as moment from 'moment';

interface Props {
  posts: Post[];
}

export default function PostTable({ posts }: Props) {
  const [postElements, setPostElements] = useState<JSX.Element[]>();

  useEffect(() => {
    const newPostElements: JSX.Element[] = [];
    newPostElements.push(
      <>
        <Grid className='' xs={2}>
          <Typography variant='h6'>번호</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography variant='h6'>제목</Typography>
        </Grid>
        <Grid xs={2}>
          <Typography variant='h6'>작성일</Typography>
        </Grid>
        <Grid xs={2}>
          <Typography variant='h6'>조회</Typography>
        </Grid>
      </>,
    );

    posts.map(post => {
      const postDate: Date = new Date(Date.parse(post.create_date));
      console.log(Date.parse(post.create_date));
      console.log(postDate);
      console.log(`${postDate.getHours()}:${postDate.getMinutes()}`);
      console.log(isToday(postDate));
      console.log(`${postDate.getMonth() + 1}.${postDate.getDay()}`);

      let dateString = `${postDate.getHours()}:${postDate.getMinutes()}`;
      if (isToday(postDate)) {
        dateString = `${postDate.getHours()}:${postDate.getMinutes()}`;
      } else {
        dateString = `${postDate.getMonth() + 1}.${postDate.getDay()}`;
      }

      newPostElements.push(
        <>
          <Grid xs={2}>{post.id}</Grid>
          <Grid xs={6}>{post.title}</Grid>
          <Grid xs={2}>{dateString}</Grid>
          <Grid xs={2}>{post.click_cnt}</Grid>
        </>,
      );
    });

    setPostElements(newPostElements);
  }, [posts]);

  function isToday(date: Date) {
    const today = new Date();

    // 👇️ Today's date
    console.log(today);

    if (today.toDateString() === date.toDateString()) {
      return true;
    }

    return false;
  }

  return <Grid container> {postElements}</Grid>;
}
