import { api } from '../persistent/api';

export class LinkApi {
  public static async createLink(url: string) {
    return api.post('links', { url, type: 'free' });
  }
}
