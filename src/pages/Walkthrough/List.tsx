import React, { useEffect, useState } from 'react';
import Pagination from 'components/viewer/Pagination';
import PostTable from 'components/viewer/PostTable';

import type { RootState } from 'redux/store';
import { action, cleanContent } from 'redux/module/post';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

export default function List() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const totalCount = useAppSelector((state: RootState) => state.post.totalCount);
  const postList = useAppSelector((state: RootState) => state.post.postList);
  const content = useAppSelector((state: RootState) => state.post.content);

  const dispatch = useAppDispatch();

  console.log(totalCount, postList);
  // onMount
  useEffect(() => {
    // post 총 갯수 가져오기
    dispatch(action.getPostCount(null));

    // post 가져오기
    const pageInfo = {
      page,
      pageSize,
    };
    dispatch(action.listPost(pageInfo));
  }, [page, pageSize]);

  const onPageChange = (page: number, pageSize: number) => {
    // content 비우기
    dispatch(cleanContent());
    // page, pageSize set하기
    setPageSize(pageSize);
    setPage(page);
    // TODO: url 바꿔두기 + url에 parameter 있으면 세팅하기
  };

  return (
    <>
      <PostTable posts={postList} />
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
