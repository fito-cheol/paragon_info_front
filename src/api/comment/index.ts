import customAxios from 'api/customAxios';

interface DefaultObjectReturn {
  success: boolean;
  message: string;
}
interface AddCommentFormat {
  postId: number;
  text: string;
}

export async function addComment(data: AddCommentFormat) {
  const response = await customAxios.post<DefaultObjectReturn>('/comment/addComment', data);
  return response.data;
}
