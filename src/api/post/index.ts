import customAxios from 'api/customAxios';

interface uploadForamt {
  heroName: string;
  skillTree: string[];
  startItems: string[];
  endItems: string[];
  text: string;
  title: string;
}

export async function upload(data: uploadForamt) {
  return await customAxios.post('/post/upload', data);
}
