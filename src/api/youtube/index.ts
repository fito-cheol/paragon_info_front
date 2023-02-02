import customAxios from 'api/customAxios';

type DefaultReturn = string;

export async function upload(data: YoutubeFormat) {
  const response = await customAxios.post<DefaultReturn>('/youtube/upload', data);
  return response.data;
}

export async function list(data: ListFormat) {
  const response = await customAxios.get<YoutubeFormat[]>('/youtube/list', { params: data });
  return response.data;
}

export async function getTotalCount() {
  const response = await customAxios.get<ReturnCount>('/youtube/totalCount');
  return response.data;
}
