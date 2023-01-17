import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { useNavigate, useLocation, createSearchParams } from 'react-router-dom';

import type { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

import { getTotalCount, list, getPost, deletePost, getDoILikePost, addLike, deleteLike } from 'api/post/index';
import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';

import Grid from '@mui/material/Unstable_Grid2';
import Pagination from 'components/viewer/Pagination';
import PostTable from 'components/viewer/PostTable';
import PostContent from 'components/viewer/PostContent';
import PostButtonList from 'components/button/PostButtonList';
import PostFilter from 'components/filter/PostFilter';

import likeImage from 'assets/icon/Like-Button-Transparent.png';
import likeShineImage from 'assets/icon/Like-Shine-Button-Transparent.png';

import './List.scoped.scss';

interface PostFullInfo {
  post: Post;
  content: Content;
  user: User;
}

const PageSizeDefault = 10;
const PageDefault = 1;

export default function List() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage: string | null = searchParams.get('page');
  const queryPageSize = searchParams.get('pageSize');
  const no = searchParams.get('no');
  const hero = searchParams.get('hero');

  const [pageSize, setPageSize] = useState<number>(queryPageSize ? Number(queryPageSize) : PageSizeDefault);
  const [page, setPage] = useState<number>(queryPage ? Number(queryPage) : PageDefault);
  const [selectedHeroName, setSelectedHeroName] = useState<string | null>(hero || null);
  const [canDeletePost, setCanDeletePost] = useState<boolean>(false);
  const [canModifyPost, setCanModifyPost] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostFullInfo | null>(null);
  const [doILikePost, setDoILikePost] = useState<boolean>(false);

  const user = useAppSelector((state: RootState) => state.user.user);

  const totalCountQuery = useQuery<ReturnCount, AxiosError, number>(
    ['postCount', selectedHeroName],
    () => getTotalCount({ heroName: selectedHeroName }),
    {
      select: res => res.totalCount,
      placeholderData: { totalCount: 0 },
    },
  );

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
  const doILikeMutation = useMutation(getDoILikePost, {
    onSuccess: ({ likePost }) => {
      setDoILikePost(likePost);
    },
    onError: () => {
      setDoILikePost(false);
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
    const pageInfo: ListFormat = {
      page,
      pageSize,
    };
    if (selectedHeroName) {
      pageInfo.heroName = selectedHeroName;
    }
    postListMutation.mutate(pageInfo);
  }, [page, pageSize, selectedHeroName]);

  useEffect(() => {
    if (!selectedPost) {
      setCanDeletePost(false);
      setCanModifyPost(false);
    } else {
      const isOwner = selectedPost.user.email == cookies.get('email');
      setCanDeletePost(isOwner);
      setCanModifyPost(isOwner);
    }
    if (selectedPost && user) {
      doILikeMutation.mutate({ postId: selectedPost.post.id });
    } else {
      setDoILikePost(false);
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
  const getContent = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>, post: Post) => {
    if (event.ctrlKey) {
      const params = { page: page.toString(), pageSize: pageSize.toString(), no: post.id.toString() };
      window.open(location.pathname + `?${createSearchParams(params)}`, '_blank');
    } else {
      postMutation.mutate({ postId: post.id });
    }
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
  const likeHandler = async () => {
    if (!user) {
      toast.warn('로그인 후 추천 가능합니다');
      return;
    } else if (!selectedPost) {
      toast.error('잘못된 접근입니다');
      return;
    } else if (!doILikePost) {
      const { success } = await addLike({ postId: selectedPost.post.id });
      if (success) postMutation.mutate({ postId: selectedPost.post.id });
    } else {
      const { success } = await deleteLike({ postId: selectedPost.post.id });
      if (success) postMutation.mutate({ postId: selectedPost.post.id });
    }
  };
  const filterHandler = (heroName: string | null) => {
    setPageSize(PageSizeDefault);
    setPage(PageDefault);
    setSelectedHeroName(heroName);
  };

  return (
    <Grid container xs={12} className='list__wrapper'>
      {selectedPost ? (
        <>
          <Grid xs={12} sx={{ marginTop: '12px', marginBottom: '12px' }}>
            <PostContent post={selectedPost.post} content={selectedPost.content}></PostContent>
          </Grid>
          <Grid
            className='post__like--wrapper'
            xs={12}
            sx={{ marginTop: '12px', marginBottom: '12px' }}
            alignContent='center'
            justifyContent='center'
            container
            spacing={3}
          >
            <Grid>
              <button className='post__like--button'>
                <img
                  src={doILikePost ? likeShineImage : likeImage}
                  className='post__like--image'
                  width={60}
                  height={60}
                  onClick={() => likeHandler()}
                />
              </button>
            </Grid>
            <Grid>
              <h3> {selectedPost.post.like_count} </h3>
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
      <Grid xs={12} container>
        <PostFilter applyFilter={filterHandler} />
      </Grid>
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
          onClick={(event, post) => {
            getContent(event, post);
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
