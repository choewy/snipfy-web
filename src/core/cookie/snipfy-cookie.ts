import Cookies from 'universal-cookie';

export class SnipfyCookie extends Cookies {
  public static readonly ACCESS_TOKEN_KEY = 'snipfy-access-token';
  public static readonly REFRESH_TOKEN_KEY = 'snipfy-refresh-token';

  getAccessToken() {
    return this.get(SnipfyCookie.ACCESS_TOKEN_KEY) ?? null;
  }

  getRefreshToken() {
    return this.get(SnipfyCookie.REFRESH_TOKEN_KEY) ?? null;
  }

  getTokens() {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };
  }

  setAccessToken(accessToken: string) {
    this.set(SnipfyCookie.ACCESS_TOKEN_KEY, accessToken, { path: '/' });
  }

  setRefreshToken(refreshToken: string) {
    this.set(SnipfyCookie.REFRESH_TOKEN_KEY, refreshToken, { path: '/' });
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  removeAccessToken() {
    this.remove(SnipfyCookie.ACCESS_TOKEN_KEY, { path: '/' });
  }

  removeRefreshToken() {
    this.remove(SnipfyCookie.REFRESH_TOKEN_KEY, { path: '/' });
  }

  removeTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }
}

export const snipfyCookie = new SnipfyCookie();
