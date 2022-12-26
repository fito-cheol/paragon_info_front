import customAxios from 'api/customAxios';

export async function upload(data: UploadForamt) {
  return await customAxios.post('/post/uploadPost', data);
}
export async function list(data: ListFormat) {
  return await customAxios.get('/post/listPost', { params: data });
}

export async function getTotalCount() {
  return await customAxios.get('/post/totalCount');
}

export async function getPost(data: GetPostFormat) {
  return await customAxios.get('/post/getPost', { params: data });
}

export async function updatePost(data: UpdatePostFormat) {
  return await customAxios.get('/post/updatePost', { params: data });
}

export async function deletePost(data: DeletePostFormat) {
  return await customAxios.get('/post/deletePost', { params: data });
}
