import axios, { AxiosInstance } from 'axios';
import cookies from 'js-cookie';

import setupInterceptorsTo from './errorHandler';
import { checkToken } from './tokenCheker';

const SERVER_ADDRESS = process.env.REACT_APP_BACK_END_POINT;
console.log(SERVER_ADDRESS, process.env);

const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`, // 기본 서버 주소 입력
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    access_token: cookies.get('access_token'),
  },
});

// customAxios.interceptors.request.use(checkToken);

setupInterceptorsTo(customAxios);

export default customAxios;
