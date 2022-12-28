import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { isObject, isEmpty } from 'lodash';

// https://dev.to/vikirobles/how-to-create-an-auth-login-system-with-axios-interceptors-typescript-2k11

const API_DEFAULT_MESSAGE_REQUEST = 'The request is invalid';

function handleError(serverError: any) {
  if (serverError?.errorMessage) {
    if (serverError?.errorMessage == '디비에 등록되지 않은 토큰') {
      // https://stackoverflow.com/questions/45043219/calling-dispatch-function-from-a-blank-javascript-file
      // toast.error(`로그아웃 되었습니다. 다시로그인 해주세요`);
    }
  }
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return config;
};

const onResponseSuccess = (response: AxiosResponse): any => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  handleError(error?.response?.data);
  return Promise.reject(error);
};

export default function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, undefined);

  axiosInstance.interceptors.response.use(onResponseSuccess, onResponseError);

  return axiosInstance;
}
