import axios, { AxiosRequestConfig } from 'axios';
import cookies from 'js-cookie';
import * as jwt from 'jsonwebtoken';

export const checkLogin = async (config: AxiosRequestConfig) => {
  const clientId = cookies.get('clientId');
  const credential = cookies.get('credential');

  if (!clientId && !credential) {
    if (config && config.headers) {
      config.headers['clientId'] = null;
      config.headers['credential'] = null;
      return config;
    } else {
      config.headers = {
        clientId: null,
        credential: null,
      };
      return config;
    }
  }

  if (config && config.headers) {
    config.headers['clientId'] = clientId;
    config.headers['credential'] = credential;
  }

  return config;
};
