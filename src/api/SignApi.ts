import { api } from '../persistent/api';

export class SignApi {
  public static getSocialLoginPageURL() {
    const href = window.location.href;
    const [protocol, url] = href.split('://');
    const state = `${protocol}://${url.split('/').shift()}/sign/kakao`;

    return api.post('sign/kakao/login', { state });
  }

  public static async getToken(authKey: string) {
    return api.post('sign/token', { authKey });
  }
}
