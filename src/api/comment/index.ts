import customAxios from 'api/customAxios';

interface DefaultObjectReturn {
  success: boolean;
  message: string;
}
interface AddCommentFormat {
  postId: number;
  text: string;
}
interface GetCommentFormat {
  postId: number;
}
interface DeleteCommentFormat {
  postId: number;
  root: number;
  level: number;
}

export async function addComment(data: AddCommentFormat) {
  const response = await customAxios.post<DefaultObjectReturn>('/comment/addComment', data);
  return response.data;
}

export async function getComment(data: GetCommentFormat) {
  const response = await customAxios.post<Comment[]>('/comment/getComment', data);
  return response.data;
}
export async function deleteComment(data: DeleteCommentFormat) {
  const response = await customAxios.post<DefaultObjectReturn>('/comment/deleteComment', data);
  return response.data;
}
