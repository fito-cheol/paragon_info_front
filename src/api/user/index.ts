import customAxios from 'api/customAxios';

interface LoginForamt {
  clientId: string;
  credential: string;
}
interface UpdateNickFormat {
  nickname: string;
}

export async function googleLogin(data: LoginForamt) {
  return await customAxios.post('/user/googleLogin', data);
}

export async function updateNickname(data: UpdateNickFormat) {
  return await customAxios.post('/user/updateNickname', data);
}
