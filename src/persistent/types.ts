import { HttpStatusCode } from 'axios';

export type ApiResponse<T> = {
  traceId: string;
  timestamp: string;
  data: T;
};

export type ApiErrorResponse<T> = {
  traceId: string;
  timestamp: string;
  error: {
    message: string;
    statusCode: HttpStatusCode;
  };
};
