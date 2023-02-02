import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import getYoutubeId from 'get-youtube-id';
import { useQuery, useMutation } from 'react-query';

import type { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

import { upload, list, getTotalCount } from 'api/youtube/index';
import { getVideo } from 'api/google/youtube';

import YoutubeCard from 'components/card/YoutubeCard';
import Pagination from 'components/viewer/Pagination';
import Grid from '@mui/material/Unstable_Grid2';

import './List.scoped.scss';

interface YoutubeFormat {
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}
const PageSizeDefault = 18;
const PageDefault = 1;

export default function VideoList() {
  const [text, setText] = useState<string>('');
  const [youtubeList, setYoutubeList] = useState<YoutubeFormat[]>([]);

  const user = useAppSelector((state: RootState) => state.user.user);

  const totalCountQuery = useQuery<ReturnCount, AxiosError, number>(['postCount'], () => getTotalCount(), {
    select: res => res.totalCount,
    placeholderData: { totalCount: 0 },
  });
  const postListMutation = useMutation(list, {
    onSuccess: youtubeList => {
      console.log(youtubeList);
      setYoutubeList(youtubeList);
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage: string | null = searchParams.get('page');
  const queryPageSize = searchParams.get('pageSize');
  const [pageSize, setPageSize] = useState<number>(queryPageSize ? Number(queryPageSize) : PageSizeDefault);
  const [page, setPage] = useState<number>(queryPage ? Number(queryPage) : PageDefault);

  useEffect(() => {
    updatePage();
    updateUrl();
  }, [page, pageSize]);

  const onPageChange = (page: number, pageSize: number) => {
    setPageSize(pageSize);
    setPage(page);
  };
  const updateUrl = () => {
    const newParam: Record<string, string | string[]> = { page: page.toString(), pageSize: pageSize.toString() };
    setSearchParams(newParam);
  };
  const updatePage = () => {
    const pageInfo: ListFormat = {
      page,
      pageSize,
    };
    postListMutation.mutate(pageInfo);
  };

  const clickHandler = async () => {
    const id = getYoutubeId(text);
    console.log(id);
    if (!id) return;

    const result = await getVideo({
      part: 'snippet',
      id: id,
      locale: '대한민국',
      key: 'AIzaSyBGQ9PIYkwxk6iCSstQ5o-Pvt9CPeevzno',
    });
    // The request is missing a valid API key
    if (result.items.length > 0) {
      const item = result.items[0];
      await upload({
        url: `https://www.youtube.com/watch?v=${item.id}`,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.medium.url,
      });
      updatePage();
    }
  };

  return (
    <Grid container>
      {user && user.email.startsWith('dmsghs92@') ? (
        <Grid xs={12}>
          <input type='text' className='comment__input' value={text} onChange={e => setText(e.target.value)} />
          <button onClick={() => clickHandler()}> 유튜브 업로드 </button>
        </Grid>
      ) : (
        <></>
      )}

      {youtubeList.map((youtubeData, index) => (
        <Grid xs='auto' key={index} sx={{ margin: '16px 5px' }}>
          <YoutubeCard youtubeData={youtubeData} />
        </Grid>
      ))}
      <Grid xs={12} sx={{ marginTop: '12px', marginBottom: '12px' }}>
        <Pagination
          page={page}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalCountQuery.data || 0}
          pageRangeDisplayed={PageSizeDefault}
          onPageChange={newPage => {
            onPageChange(newPage, pageSize);
          }}
        />
      </Grid>
    </Grid>
  );
}
