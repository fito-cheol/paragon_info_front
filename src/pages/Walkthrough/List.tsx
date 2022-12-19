import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { RootState } from 'redux/store';
import { action, cleanContent } from 'redux/module/post';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import Pagination from 'components/viewer/Pagination';
import PostTable from 'components/viewer/PostTable';
import PostContent from 'components/viewer/PostContent';
import { getContent } from 'api/post';

export default function List() {
  // router 관련
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage: string | null = searchParams.get('page');
  const queryPageSize = searchParams.get('pageSize');

  const [pageSize, setPageSize] = useState<number>(queryPageSize ? Number(queryPageSize) : 10);
  const [page, setPage] = useState<number>(queryPage ? Number(queryPage) : 1);
  const totalCount = useAppSelector((state: RootState) => state.post.totalCount);
  const postList = useAppSelector((state: RootState) => state.post.postList);
  const content = useAppSelector((state: RootState) => state.post.content);

  const dispatch = useAppDispatch();

  // onMount
  useEffect(() => {
    updateUrl();
  }, []);

  useEffect(() => {
    // post 총 갯수 가져오기
    dispatch(action.getPostCount(null));

    // post 가져오기
    const pageInfo = {
      page,
      pageSize,
    };
    dispatch(action.listPost(pageInfo));
    updateUrl();
  }, [page, pageSize]);

  const onPageChange = (page: number, pageSize: number) => {
    // content 비우기
    dispatch(cleanContent());

    setPageSize(pageSize);
    setPage(page);
  };
  const updateUrl = () => {
    setSearchParams({ page: page.toString(), pageSize: pageSize.toString() });
  };
  const getContent = (content_FK: number) => {
    dispatch(action.getPostContent({ content_FK: content_FK }));
  };

  return (
    <>
      {content ? <PostContent content={content}></PostContent> : <></>}
      <PostTable
        posts={postList}
        onClick={content_FK => {
          getContent(content_FK);
        }}
      />
      <Pagination
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCount}
        pageRangeDisplayed={10}
        onPageChange={newPage => {
          onPageChange(newPage, pageSize);
        }}
      />
    </>
  );
}
