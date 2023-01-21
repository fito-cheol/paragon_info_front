import customAxios from 'api/customAxios';

interface LoginSuccessReturn {
  newUser: boolean;
  message: string;
  user: UserFull;
}
export async function googleLogin(data: UserFull) {
  const response = await customAxios.post<LoginSuccessReturn>('/user/googleLogin', data);
  return response.data;
}
