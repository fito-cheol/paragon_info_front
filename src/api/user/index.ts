import customAxios from 'api/customAxios';

interface LoginForamt {
  email: string;
  full_name: string;
  clientId: string;
  access_token: string;
}
interface LoginSuccessReturn {
  newUser: boolean;
  message: string;
  user: User;
}
export async function googleLogin(data: LoginForamt) {
  const response = await customAxios.post<LoginSuccessReturn>('/user/googleLogin', data);
  return response.data;
}
