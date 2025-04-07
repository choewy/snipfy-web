import Cookies from 'universal-cookie';

export class SnipfyCookieService extends Cookies {
  public static readonly ACCESS_TOKEN_KEY = 'snipfy-access-token';
  public static readonly REFRESH_TOKEN_KEY = 'snipfy-refresh-token';

  getAccessToken() {
    return this.get(SnipfyCookieService.ACCESS_TOKEN_KEY) ?? null;
  }

  getRefreshToken() {
    return this.get(SnipfyCookieService.REFRESH_TOKEN_KEY) ?? null;
  }

  getTokens() {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };
  }

  setAccessToken(accessToken: string) {
    this.set(SnipfyCookieService.ACCESS_TOKEN_KEY, accessToken, { path: '/' });
  }

  setRefreshToken(refreshToken: string) {
    this.set(SnipfyCookieService.REFRESH_TOKEN_KEY, refreshToken, { path: '/' });
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  removeAccessToken() {
    this.remove(SnipfyCookieService.ACCESS_TOKEN_KEY, { path: '/' });
  }

  removeRefreshToken() {
    this.remove(SnipfyCookieService.REFRESH_TOKEN_KEY, { path: '/' });
  }

  removeTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }
}

export const snipfyCookieService = new SnipfyCookieService();
