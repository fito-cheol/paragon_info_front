import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cookies from 'js-cookie';
import Grid from '@mui/material/Unstable_Grid2';

import { useNavigate } from 'react-router-dom';

import type { RootState } from 'redux/store';
import { action, cleanSelectedPost } from 'redux/module/post';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import Pagination from 'components/viewer/Pagination';
import PostTable from 'components/viewer/PostTable';
import PostContent from 'components/viewer/PostContent';
import PostButtonList from 'components/button/PostButtonList';

import './List.scoped.scss';

export default function List() {
  // router 관련
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage: string | null = searchParams.get('page');
  const queryPageSize = searchParams.get('pageSize');
  const no = searchParams.get('no');

  const [pageSize, setPageSize] = useState<number>(queryPageSize ? Number(queryPageSize) : 10);
  const [page, setPage] = useState<number>(queryPage ? Number(queryPage) : 1);
  const [canDeletePost, setCanDeletePost] = useState<boolean>(false);
  const [canModifyPost, setCanModifyPost] = useState<boolean>(false);
  const totalCount = useAppSelector((state: RootState) => state.post.totalCount);
  const postList = useAppSelector((state: RootState) => state.post.postList);
  const selectedPost = useAppSelector((state: RootState) => state.post.selectedPost);
  const user = useAppSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
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
    dispatch(action.getPostCount(null));
    const pageInfo = {
      page,
      pageSize,
    };
    dispatch(action.listPost(pageInfo));
  }, [page, pageSize]);
  useEffect(() => {
    if (!selectedPost) {
      setCanDeletePost(false);
      setCanModifyPost(false);
    } else if (user) {
      const isOwner = selectedPost.user.clientId == user.clientId;
      setCanDeletePost(isOwner);
      setCanModifyPost(isOwner);
    }
  }, [selectedPost]);

  useEffect(() => {
    updateUrl();
  }, [page, pageSize, selectedPost]);

  const onPageChange = (page: number, pageSize: number) => {
    dispatch(cleanSelectedPost());

    setPageSize(pageSize);
    setPage(page);
  };

  const updateUrl = () => {
    if (selectedPost) {
      const newParam = { page: page.toString(), pageSize: pageSize.toString(), no: selectedPost.post.id.toString() };
      setSearchParams(newParam);
    } else {
      const newParam = { page: page.toString(), pageSize: pageSize.toString() };
      setSearchParams(newParam);
    }
  };
  const getContent = (post: Post) => {
    dispatch(action.getPostInfo({ postId: post.id }));
  };
  const writeHandler = () => {
    // link
    console.log('link to writePage');
    navigate('/Walkthrough', { replace: true });
  };
  const deleteHandler = () => {
    if (selectedPost) {
      dispatch(action.postDelete({ postId: selectedPost.post.id }));
    }
  };
  const modifyHandler = () => {
    navigate('/', { replace: false });
  };

  return (
    <div className='list__wrapper'>
      {selectedPost ? <PostContent post={selectedPost.post} content={selectedPost.content}></PostContent> : <></>}
      <PostButtonList
        canDelete={canDeletePost}
        canModify={canModifyPost}
        onDelete={deleteHandler}
        onModify={modifyHandler}
        onWrite={writeHandler}
      />
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
