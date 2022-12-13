import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { isObject, isEmpty } from 'lodash';

// https://dev.to/vikirobles/how-to-create-an-auth-login-system-with-axios-interceptors-typescript-2k11

const API_DEFAULT_MESSAGE_REQUEST = 'The request is invalid';

function handleError(serverError: any) {
  if (isObject(serverError)) {
    Object.entries(serverError).forEach(([, value]) => {
      const errorMessage = isEmpty(value) ? API_DEFAULT_MESSAGE_REQUEST : value;
      toast.error(`${errorMessage}`);
    });
  }
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return config;
};

const onResponseSuccess = (response: AxiosResponse): any => {
  return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  handleError(error?.response?.data);
  console.warn(error?.response?.status);
  return Promise.reject(error);
};

export default function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, undefined);

  axiosInstance.interceptors.response.use(onResponseSuccess, onResponseError);

  return axiosInstance;
}
