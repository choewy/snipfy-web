import { api } from '../persistent/api';
import { SocialPlatform } from '../persistent/enums';
import { ApiResponse } from '../persistent/types';

import { SocialLoginPageUrlResponse } from './types';

export class SignApi {
  public static getSocialLoginPageUrl(platform: SocialPlatform) {
    const href = window.location.href;
    const [protocol, url] = href.split('://');
    const state = `${protocol}://${url.split('/').shift()}/sign`;

    return api.post<ApiResponse<SocialLoginPageUrlResponse>>(`sign/${platform}/login`, { state });
  }

  public static async getToken(authKey: string) {
    return api.post('sign/token', { authKey });
  }
}
