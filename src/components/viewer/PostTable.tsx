import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import heroImages from 'assets/hero/imagePreloaderHero';
import './PostTable.scoped.scss';

interface Props {
  posts: Post[];
  onClick?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>, post: Post) => void;
}

export default function PostTable({ posts, onClick }: Props) {
  const [postElements, setPostElements] = useState<JSX.Element[]>();

  useEffect(() => {
    const newPostElements: JSX.Element[] = [];
    newPostElements.push(
      <Grid container xs={12} key='Header' className='table__header--row'>
        <Grid className='' xs={1} container alignContent='center' justifyContent='center'>
          <Typography variant='h6'>번호</Typography>
        </Grid>
        <Grid className='' xs={2} container alignContent='center' justifyContent='center'>
          <Typography variant='h6'>영웅</Typography>
        </Grid>
        <Grid xs={5} container alignContent='center' justifyContent='center'>
          <Typography variant='h6'>제목</Typography>
        </Grid>
        <Grid xs={2} container alignContent='center' justifyContent='center'>
          <Typography variant='h6'>작성자</Typography>
        </Grid>
        <Grid xs={1} container alignContent='center' justifyContent='center'>
          <Typography variant='h6'>작성일</Typography>
        </Grid>
        <Grid xs={1} container alignContent='center' justifyContent='center'>
          <Typography variant='h6'>조회</Typography>
        </Grid>
      </Grid>,
    );
    posts.map((post, index) => {
      const postDate: Date = new Date(Date.parse(post.create_date));

      let dateString = `${postDate.getHours()}:${postDate.getMinutes()}`;
      if (isToday(postDate)) {
        dateString = `${postDate.getHours()}:${postDate.getMinutes()}`;
      } else {
        dateString = `${postDate.getMonth() + 1}.${postDate.getDate()}`;
      }

      newPostElements.push(
        <Grid container xs={12} key={index} className='post__row'>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__id'>{post.id}</p>
          </Grid>
          <Grid xs={2} container alignContent='center' justifyContent='center'>
            <img src={heroImages[post.hero_FK]} loading='lazy' width={40} height={40} />
          </Grid>
          <Grid xs={5} container alignContent='center' justifyContent='start'>
            <p
              onClick={event => {
                if (onClick) {
                  onClick(event, post);
                }
              }}
              className='post__title'
            >
              {post.title}
            </p>
          </Grid>
          <Grid xs={2} container alignContent='center' justifyContent='center'>
            <p className='post__nickname'>{post.nickname}</p>
          </Grid>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__date'>{dateString}</p>
          </Grid>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__click_cnt'>{post.click_cnt}</p>
          </Grid>
        </Grid>,
      );
    });

    setPostElements(newPostElements);
  }, [posts]);

  function isToday(date: Date) {
    const today = new Date();

    if (today.toDateString() === date.toDateString()) {
      return true;
    }

    return false;
  }

  return <Grid container> {postElements}</Grid>;
}
