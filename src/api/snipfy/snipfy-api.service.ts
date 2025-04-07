import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { configService } from '../../core/config/config.service';

import { SignPlatform } from './persistents/enums';
import { SnipfyCreateLinkResult, SnipfyGetLoginPageUrlResult, SnipfyGetSignTokenResult } from './persistents/types';
import { SnipfyApiResponse } from './persistents/classes';

import { snipfyCookieService } from './snipfy-cookie.service';

const AXIOS_INSTANCE = axios.create({ baseURL: configService.getSnipfyApiUrl() });

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const accessToken = snipfyCookieService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  const refreshToken = snipfyCookieService.getRefreshToken();

  if (refreshToken) {
    config.headers['x-refresh-token'] = refreshToken;
  }

  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    const accessToken = response.headers['x-access-token'];
    const refreshToken = response.headers['x-refresh-token'];

    if (accessToken && refreshToken) {
      snipfyCookieService.setTokens(accessToken, refreshToken);
    }

    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      snipfyCookieService.removeTokens();
    }

    return Promise.reject(error);
  },
);

export class SnipfyApiService {
  constructor(protected readonly api: AxiosInstance) {}

  protected async request<T>(config: AxiosRequestConfig): Promise<SnipfyApiResponse<T>> {
    return await this.api
      .request<T>(config)
      .then((response) => new SnipfyApiResponse(true, response))
      .catch((error) => new SnipfyApiResponse(false, error.response));
  }

  async getLoginPageUrl(platform: SignPlatform) {
    const href = window.location.href;
    const [protocol, url] = href.split('://');
    const callbackUrl = `${protocol}://${url.split('/').shift()}/sign`;

    return this.request<SnipfyGetLoginPageUrlResult>({
      method: 'POST',
      url: `/sign/${platform}/login`,
      data: { callbackUrl },
    });
  }

  async getSignToken(authKey: string) {
    return this.request<SnipfyGetSignTokenResult>({
      method: 'POST',
      url: '/sign/token',
      data: { authKey },
    });
  }

  async createLink(url: string) {
    return this.request<SnipfyCreateLinkResult>({
      method: 'POST',
      url: '/links',
      data: { url },
    });
  }
}

export const snipfySignApiService = new SnipfyApiService(AXIOS_INSTANCE);
