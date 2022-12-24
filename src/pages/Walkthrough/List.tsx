import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { RootState } from 'redux/store';
import { action, cleanContent, cleanPost } from 'redux/module/post';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import Pagination from 'components/viewer/Pagination';
import PostTable from 'components/viewer/PostTable';
import PostContent from 'components/viewer/PostContent';

import './List.scoped.scss';

export default function List() {
  // router 관련
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage: string | null = searchParams.get('page');
  const queryPageSize = searchParams.get('pageSize');
  const no = searchParams.get('no');

  const [pageSize, setPageSize] = useState<number>(queryPageSize ? Number(queryPageSize) : 10);
  const [page, setPage] = useState<number>(queryPage ? Number(queryPage) : 1);
  const totalCount = useAppSelector((state: RootState) => state.post.totalCount);
  const postList = useAppSelector((state: RootState) => state.post.postList);
  const content = useAppSelector((state: RootState) => state.post.content);
  const post = useAppSelector((state: RootState) => state.post.post);

  const dispatch = useAppDispatch();

  // mounted
  useEffect(() => {
    // post 가져오기
    if (no) {
      dispatch(action.getPostInfo({ postId: Number(no) }));
    }
  }, []);
  // computed
  useEffect(() => {
    // post 총 갯수 가져오기
    dispatch(action.getPostCount(null));

    // postList 가져오기
    const pageInfo = {
      page,
      pageSize,
    };
    dispatch(action.listPost(pageInfo));
  }, [page, pageSize]);

  useEffect(() => {
    updateUrl();
  }, [page, pageSize, post]);

  const onPageChange = (page: number, pageSize: number) => {
    dispatch(cleanContent());
    dispatch(cleanPost());

    setPageSize(pageSize);
    setPage(page);
  };

  const updateUrl = () => {
    if (post) {
      const newParam = { page: page.toString(), pageSize: pageSize.toString(), no: post.id.toString() };
      setSearchParams(newParam);
    } else {
      const newParam = { page: page.toString(), pageSize: pageSize.toString() };
      setSearchParams(newParam);
    }
  };
  const getContent = (post: Post) => {
    dispatch(action.getPostInfo({ postId: post.id }));
  };

  return (
    <div className='list__wrapper'>
      {content && post ? <PostContent post={post} content={content}></PostContent> : <></>}
      <div> 수정, 삭제 버튼 </div>
      <PostTable
        posts={postList}
        onClick={post => {
          getContent(post);
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
    </div>
  );
}
