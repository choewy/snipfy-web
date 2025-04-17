export class ConfigService {
  private getOrThrow(key: string) {
    const value = import.meta.env[key];

    if (!value) {
      throw new Error(`${key} is not defined`);
    }

    return value;
  }

  public getNodeEnv() {
    return this.getOrThrow('NODE_ENV');
  }

  public getSnipfyApiUrl() {
    return this.getOrThrow('VITE_SNIPFY_API_URL');
  }

  public getSnipfyGatewayUrl() {
    return this.getOrThrow('VITE_SNIPFY_GATEWAY_URL');
  }
}

export const configService = new ConfigService();
