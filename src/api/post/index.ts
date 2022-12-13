import customAxios from 'api/customAxios';

interface UploadForamt {
  heroName: string;
  skillTree: string[];
  startItems: string[];
  endItems: string[];
  possibleItems: string[];
  text: string;
  title: string;
}

export async function upload(data: UploadForamt) {
  return await customAxios.post('/post/uploadPost', data);
}
