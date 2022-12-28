import customAxios from 'api/customAxios';

interface LoginForamt {
  clientId: string;
  credential: string;
}
interface UpdateNickFormat {
  nickname: string;
}

interface LoginSuccessReturn {
  newUser: boolean;
  message: string;
  clientId: string;
  credential: string;
  nickname: string;
}
interface UpdateNickSuccessReturn {
  nickname: string;
}
export async function googleLogin(data: LoginForamt) {
  const response = await customAxios.post<LoginSuccessReturn>('/user/googleLogin', data);
  return response.data;
}

export async function updateNickname(data: UpdateNickFormat) {
  const response = await customAxios.post<UpdateNickSuccessReturn>('/user/updateNickname', data);
  return response.data;
}
