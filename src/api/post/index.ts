import customAxios from 'api/customAxios';

export async function upload(data: UploadForamt) {
  const response = await customAxios.post('/post/uploadPost', data);
  return response.data;
}

export async function list(data: ListFormat) {
  const response = await customAxios.get('/post/listPost', { params: data });
  return response.data;
}

export interface getTotalCountReturn {
  totalCount: number;
}
export async function getTotalCount() {
  const response = await customAxios.get<getTotalCountReturn>('/post/totalCount');
  return response.data;
}

export async function getPost(data: GetPostFormat) {
  const response = await customAxios.get('/post/getPost', { params: data });
  return response.data;
}

export async function updatePost(data: UpdatePostFormat) {
  const response = await customAxios.get('/post/updatePost', { params: data });
  return response.data;
}

export async function deletePost(data: DeletePostFormat) {
  const response = await customAxios.get('/post/deletePost', { params: data });
  return response.data;
}
