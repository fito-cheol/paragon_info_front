import customAxios from 'api/customAxios';

interface DefaultObjectReturn {
  success: boolean;
  message: string;
}
interface AddCommentFormat {
  postId: number;
  text: string;
}
interface getCommentFormat {
  postId: number;
}

export async function addComment(data: AddCommentFormat) {
  const response = await customAxios.post<DefaultObjectReturn>('/comment/addComment', data);
  return response.data;
}

export async function getComment(data: getCommentFormat) {
  const response = await customAxios.post<Comment[]>('/comment/getComment', data);
  return response.data;
}
