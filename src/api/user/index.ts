import customAxios from 'api/customAxios';

interface LoginSuccessReturn {
  newUser: boolean;
  message: string;
  user: User;
}
export async function googleLogin(data: User) {
  const response = await customAxios.post<LoginSuccessReturn>('/user/googleLogin', data);
  return response.data;
}
