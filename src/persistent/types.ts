import { HttpStatusCode } from 'axios';

export type ApiResponse<T> = {
  traceId: string;
  timestamp: string;
  data?: T;
  error?: {
    message: string;
    statusCode: HttpStatusCode;
  };
};
