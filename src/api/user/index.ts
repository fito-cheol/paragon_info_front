import customAxios from 'api/customAxios';

interface LoginForamt {
  clientId: string;
  credential: string;
}
interface UpdateNickFormat {
  nickname: string;
}

export async function googleLogin(data: LoginForamt) {
  const response = await customAxios.post('/user/googleLogin', data);
  return response.data;
}

export async function updateNickname(data: UpdateNickFormat) {
  const response = await customAxios.post('/user/updateNickname', data);
  return response.data;
}
