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
export async function getContent(data: GetContentFormat) {
  return await customAxios.get('/post/getContent', { params: data });
}
