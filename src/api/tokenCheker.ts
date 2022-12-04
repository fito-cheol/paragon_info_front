import axios, { AxiosRequestConfig } from 'axios';
import cookies from 'js-cookie';
import * as jwt from 'jsonwebtoken';

// https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-axios-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0

const SERVER_ADDRESS = process.env.VUE_APP_API_ENDPOINT;

export const checkToken = async (config: AxiosRequestConfig) => {
  let accessToken = cookies.get('access_token');
  if (!accessToken) {
    if (config && config.headers) {
      config.headers['accessToken'] = null;
      config.headers['refreshToken'] = null;
      return config;
    } else {
      config.headers = {
        accessToken: null,
        refreshToken: null,
      };
      return config;
    }
  }

  const { exp } = jwt.decode(accessToken) as jwt.JwtPayload;
  const nowDate = new Date().getTime() / 1000;
  const expired = exp ? exp < nowDate : true;

  // 토큰 만료시간이 지났다면
  if (expired) {
    const { data } = await axios.post(
      `${SERVER_ADDRESS}/token`, // FIXME: Refresh Url
      { accessToken },
      {
        headers: {
          access_token: accessToken,
        },
      },
    );
    // 리프레쉬 토큰 발급 서버 요청

    const { refreshToken } = data.data;

    accessToken = refreshToken;
    if (config && config.headers) config.headers['access_token'] = accessToken;
  }

  return config;
};
