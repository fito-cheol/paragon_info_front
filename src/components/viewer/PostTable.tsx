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
          <p className='post__header post__header--text'>번호</p>
        </Grid>
        <Grid xs={2} container alignContent='center' justifyContent='center'>
          <p className='post__header post__header--text'>영웅</p>
        </Grid>
        <Grid xs={4} container alignContent='center' justifyContent='center'>
          <p className='post__header post__header--text'>제목</p>
        </Grid>
        <Grid xs={2} container alignContent='center' justifyContent='center'>
          <p className='post__header post__header--text'>작성자</p>
        </Grid>
        <Grid xs={1} container alignContent='center' justifyContent='center'>
          <p className='post__header post__header--text'>추천수</p>
        </Grid>
        <Grid xs={1} container alignContent='center' justifyContent='center'>
          <p className='post__header post__header--text'>작성일</p>
        </Grid>
        <Grid xs={1} container alignContent='center' justifyContent='center'>
          <p className='post__header post__header--text'>조회</p>
        </Grid>
      </Grid>,
    );
    posts.map((post, index) => {
      const dateString = dateParser(post.create_date);

      newPostElements.push(
        <Grid container xs={12} key={index} className='post__row'>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__text post__text--id'>{post.id}</p>
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
              className='post__text post__text--title'
            >
              {post.title}
            </p>
          </Grid>
          <Grid xs={2} container alignContent='center' justifyContent='center'>
            <p className='post__text post__text--nickname'>{post.full_name}</p>
          </Grid>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__text post__text--likeCount'>{post.like_count}</p>
          </Grid>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__text post__text--date'>{dateString}</p>
          </Grid>
          <Grid xs={1} container alignContent='center' justifyContent='center'>
            <p className='post__text post__text--clickCount'>{post.click_count}</p>
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
