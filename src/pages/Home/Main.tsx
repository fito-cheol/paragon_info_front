import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { list } from 'api/post/index';
import { list as getYoutubeList } from 'api/youtube/index';
import { useMutation } from 'react-query';

import Grid from '@mui/material/Unstable_Grid2';
import PostTable from 'components/viewer/PostTable';
import YoutubeCard from 'components/card/YoutubeCard';

const PageSizeDefault = 10;
const PageDefault = 1;

export default function Main() {
  const navigate = useNavigate();

  const [postList, setPostList] = useState<Post[]>([]);
  const [youtubeList, setYoutubeList] = useState<YoutubeFormat[]>([]);

  const postListMutation = useMutation(list, {
    onSuccess: postList => {
      setPostList(postList);
    },
  });
  const videoListMutation = useMutation(getYoutubeList, {
    onSuccess: youtubeList => {
      setYoutubeList(youtubeList);
    },
  });

  useEffect(() => {
    const pageInfo: ListFormat = {
      page: PageDefault,
      pageSize: PageSizeDefault,
    };
    postListMutation.mutate(pageInfo);
    videoListMutation.mutate(pageInfo);
  }, []);

  // TODO: 2. 유튜브 5개
  // TODO: 3. 최근 패치 링크

  return (
    <Grid container justifyContent={'center'}>
      <Grid xs={11} container xsOffset={1}>
        <h1> 공략 </h1>
      </Grid>
      <Grid xs={12} container sx={{ marginTop: '12px', marginBottom: '12px', width: 1160 }}>
        <PostTable
          posts={postList}
          onClick={(event, post) => {
            const pathname = `/list`;
            const search = `?no=${post.id}`;
            if (event.ctrlKey) {
              window.open(pathname + search, '_blank');
            } else {
              navigate({ pathname, search });
            }
          }}
        />
      </Grid>
      <Grid xs={12} container xsOffset={1}>
        <h1> 유튜브 </h1>
      </Grid>
      <Grid xs={11} container justifyContent={'center'}>
        {youtubeList.map((youtubeData, index) => (
          <Grid xs='auto' key={index} sx={{ margin: '16px 5px' }}>
            <YoutubeCard youtubeData={youtubeData} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
