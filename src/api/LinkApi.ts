import { api } from '../persistent/api';
import { ApiResponse } from '../persistent/types';

import { CreateLinkResponse } from './types';

export class LinkApi {
  public static async createLink(url: string) {
    return api.post<ApiResponse<CreateLinkResponse>>('links', { url, type: 'free' });
  }
}
