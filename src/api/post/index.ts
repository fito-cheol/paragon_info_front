import customAxios from 'api/customAxios';

type DefaultReturn = string;

interface DefaultObjectReturn {
  success: boolean;
  message: string;
}
interface GetCountParam {
  heroName: string | null;
  searchText: string;
}

export async function upload(data: UploadFormat) {
  const response = await customAxios.post<DefaultReturn>('/post/uploadPost', data);
  return response.data;
}

export async function list(data: ListFormat) {
  const response = await customAxios.get<Post[]>('/post/listPost', { params: data });
  return response.data;
}

export async function getTotalCount(data: GetCountParam) {
  const response = await customAxios.get<ReturnCount>('/post/totalCount', { params: data });
  return response.data;
}

export async function getPost(data: GetPostFormat) {
  const response = await customAxios.get<{ post: Post; content: Content; user: User }>('/post/getPost', {
    params: data,
  });
  return response.data;
}

export async function modifyPost(data: ModifyPostFormat) {
  const response = await customAxios.post<DefaultReturn>('/post/modifyPost', data);
  return response.data;
}

export async function deletePost(data: DeletePostFormat) {
  const response = await customAxios.post<DefaultReturn>('/post/deletePost', data);
  return response.data;
}

export async function addLike(data: GetPostFormat) {
  const response = await customAxios.post<DefaultObjectReturn>('/post/addLike', data);
  return response.data;
}
export async function deleteLike(data: GetPostFormat) {
  const response = await customAxios.post<DefaultObjectReturn>('/post/deleteLike', data);
  return response.data;
}
export async function getDoILikePost(data: GetPostFormat) {
  const response = await customAxios.post<ReturnDoILike>('/post/doILikePost', data);
  return response.data;
}
