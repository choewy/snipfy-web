import { SnipfyApiInstance } from '../../core/api/snipfy-api.instance';

import { SignPlatform } from './persistents/enums';
import { SnipfyCreateLinkResult, SnipfyGetLoginPageUrlResult, SnipfyGetSignTokenResult } from './persistents/types';

export class SnipfyApiService extends SnipfyApiInstance {
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

export const snipfySignApiService = new SnipfyApiService();
