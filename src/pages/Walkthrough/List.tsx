import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cookies from 'js-cookie';
import Grid from '@mui/material/Unstable_Grid2';

import { useNavigate } from 'react-router-dom';

import type { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

import { getTotalCount, list, getPost, deletePost } from 'api/post/index';
import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';

import Pagination from 'components/viewer/Pagination';
import PostTable from 'components/viewer/PostTable';
import PostContent from 'components/viewer/PostContent';
import PostButtonList from 'components/button/PostButtonList';

import './List.scoped.scss';
interface PostFullInfo {
  post: Post;
  content: Content;
  user: User;
}
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
  const [postList, setPostList] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostFullInfo | null>(null);

  const totalCountQuery = useQuery<ReturnCount, AxiosError, number>('repoData', () => getTotalCount(), {
    select: res => res.totalCount,
    placeholderData: { totalCount: 0 },
  });
  const postListMutation = useMutation(list, {
    onSuccess: postList => {
      setPostList(postList);
    },
  });
  const postMutation = useMutation(getPost, {
    onSuccess: post => {
      setSelectedPost(post);
    },
  });
  const navigate = useNavigate();

  // mounted
  useEffect(() => {
    // post 가져오기
    if (no) {
      postMutation.mutate({ postId: Number(no) });
    }
  }, []);

  // computed
  useEffect(() => {
    const pageInfo = {
      page,
      pageSize,
    };
    postListMutation.mutate(pageInfo);
  }, [page, pageSize]);

  useEffect(() => {
    if (!selectedPost) {
      setCanDeletePost(false);
      setCanModifyPost(false);
    } else {
      const isOwner = selectedPost.user.clientId == cookies.get('clientId');
      setCanDeletePost(isOwner);
      setCanModifyPost(isOwner);
    }
  }, [selectedPost]);

  useEffect(() => {
    updateUrl();
  }, [page, pageSize, selectedPost]);

  const onPageChange = (page: number, pageSize: number) => {
    setSelectedPost(null);

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
    postMutation.mutate({ postId: post.id });
  };
  const writeHandler = () => {
    navigate('/walkthrough', { replace: true });
  };
  const deleteHandler = async () => {
    if (selectedPost) {
      const response = await deletePost({ postId: selectedPost.post.id });
      console.log(response);
      // TODO: 삭제후 팝업 및 이동 처리
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
        totalItemsCount={totalCountQuery.data || 0}
        pageRangeDisplayed={10}
        onPageChange={newPage => {
          onPageChange(newPage, pageSize);
        }}
      />
    </div>
  );
}
