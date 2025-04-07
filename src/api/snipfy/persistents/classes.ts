import { AxiosResponse } from 'axios';

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
