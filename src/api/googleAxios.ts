import axios, { AxiosInstance } from 'axios';

const SERVER_ADDRESS = 'https://www.googleapis.com';

const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`, // 기본 서버 주소 입력
  timeout: 6000,
});

export default customAxios;
