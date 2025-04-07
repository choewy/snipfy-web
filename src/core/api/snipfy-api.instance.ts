import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { snipfyCookie } from '../cookie/snipfy-cookie';
import { configService } from '../config/config.service';

const AXIOS_INSTANCE = axios.create({ baseURL: configService.getSnipfyApiUrl() });

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const accessToken = snipfyCookie.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  const refreshToken = snipfyCookie.getRefreshToken();

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
      snipfyCookie.setTokens(accessToken, refreshToken);
    }

    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      snipfyCookie.removeTokens();
    }

    return Promise.reject(error);
  },
);

export class SnipfyApiResponseError {
  message: string;
  statusCode: number;
  details: unknown;

  constructor(response: AxiosResponse) {
    const data = response?.data as any;

    this.message = data?.data?.message ?? '';
    this.statusCode = data?.data?.statusCode ?? 500;
    this.details = data?.data?.details ?? null;
  }
}

export class SnipfyApiResponse<T> {
  ok: boolean;
  traceId: string;
  data: T;
  error: SnipfyApiResponseError | null;

  constructor(ok: boolean, response: AxiosResponse<T>) {
    const data = response?.data as any;

    this.ok = ok;
    this.traceId = data?.traceId;
    this.data = ok ? data?.data : (null as unknown as T);
    this.error = ok ? null : new SnipfyApiResponseError(response);
  }
}

export class SnipfyApiInstance {
  protected readonly api = AXIOS_INSTANCE;

  protected async request<T>(config: AxiosRequestConfig): Promise<SnipfyApiResponse<T>> {
    return await this.api
      .request<T>(config)
      .then((response) => new SnipfyApiResponse(true, response))
      .catch((error) => new SnipfyApiResponse(false, error.response));
  }
}
