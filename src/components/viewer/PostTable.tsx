import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ImageHero from 'components/image/Hero';

import { dateParser } from 'utils/parsing';
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
        <Grid xs={1} container alignContent='center' justifyContent='center'>
          <Typography variant='subtitle1'>번호</Typography>
        </Grid>
        <Grid xs={2} container alignContent='center' justifyContent='center'>
          <Typography variant='subtitle1'>영웅</Typography>
        </Grid>
        <Grid xs={4} container alignContent='center' justifyContent='center'>
          <Typography variant='subtitle1'>제목</Typography>
        </Grid>
        <Grid xs={2} container alignContent='center' justifyContent='center'>
          <Typography variant='subtitle1'>작성자</Typography>
        </Grid>
        <Grid xs={1} container alignContent='center' justifyContent='center'>
          <Typography variant='subtitle1'>추천수</Typography>
        </Grid>
        <Grid xs={1} container alignContent='center' justifyContent='center'>
          <Typography variant='subtitle1'>작성일</Typography>
        </Grid>
        <Grid xs={1} container alignContent='center' justifyContent='center'>
          <Typography variant='subtitle1'>조회</Typography>
        </Grid>
      </Grid>,
    );
    posts.map((post, index) => {
      const dateString = dateParser(post.create_date);

      newPostElements.push(
        <Grid container xs={12} key={index} className='post__row'>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__id'>{post.id}</p>
          </Grid>
          <Grid xs={2} container alignContent='center' justifyContent='center'>
            <ImageHero heroName={post.hero_FK} />
          </Grid>
          <Grid xs={4} container alignContent='center' justifyContent='start'>
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
            <p className='post__nickname'>{post.full_name}</p>
          </Grid>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__date'>{post.like_count}</p>
          </Grid>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__date'>{dateString}</p>
          </Grid>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__click_count'>{post.click_count}</p>
          </Grid>
        </Grid>,
      );
    });

    setPostElements(newPostElements);
  }, [posts]);

  return (
    <Grid container xs={12} className='table'>
      {postElements}
    </Grid>
  );
}
