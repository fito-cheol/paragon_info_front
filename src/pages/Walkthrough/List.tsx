import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import type { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

import { getTotalCount, list, getPost, deletePost } from 'api/post/index';
import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';

import Grid from '@mui/material/Unstable_Grid2';
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
  const navigate = useNavigate();

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

  const user = useAppSelector((state: RootState) => state.user.user);

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

  // mounted
  useEffect(() => {
    if (no) {
      postMutation.mutate({ postId: Number(no) });
    } else {
      setSelectedPost(null);
    }
  }, [searchParams]);

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
  }, [selectedPost, user]);

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
    navigate('/write', { replace: false });
  };
  const deleteHandler = async () => {
    if (selectedPost) {
      await deletePost({ postId: selectedPost.post.id });
      navigate('/list', { replace: false });
      const pageInfo = {
        page,
        pageSize,
      };
      postListMutation.mutate(pageInfo);
      toast.info('게시물이 삭제되었습니다');
    }
  };
  const modifyHandler = () => {
    if (no) {
      navigate({
        pathname: `/modify/${no}`,
      });
    }
  };

  return (
    <Grid container xs={12} className='list__wrapper'>
      {selectedPost ? (
        <Grid xs={12} sx={{ marginTop: '12px', marginBottom: '12px' }}>
          <PostContent post={selectedPost.post} content={selectedPost.content}></PostContent>
        </Grid>
      ) : (
        <></>
      )}
      <Grid xs={12} sx={{ marginTop: '12px', marginBottom: '12px' }}>
        <PostButtonList
          canDelete={canDeletePost}
          canModify={canModifyPost}
          onDelete={deleteHandler}
          onModify={modifyHandler}
          onWrite={writeHandler}
        />
      </Grid>
      <Grid xs={12} sx={{ marginTop: '12px', marginBottom: '12px' }}>
        <PostTable
          posts={postList}
          onClick={post => {
            getContent(post);
          }}
        />
      </Grid>
      <Grid xs={12} sx={{ marginTop: '12px', marginBottom: '12px' }}>
        <Pagination
          itemsCountPerPage={pageSize}
          totalItemsCount={totalCountQuery.data || 0}
          pageRangeDisplayed={10}
          onPageChange={newPage => {
            onPageChange(newPage, pageSize);
          }}
        />
      </Grid>
    </Grid>
  );
}
