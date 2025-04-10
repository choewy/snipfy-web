import { DateTime } from 'luxon';

export class LocalStorageService {
  setNewsVisible(visible: boolean) {
    localStorage.setItem(
      'news_config',
      JSON.stringify({
        visible,
        expiredAt: DateTime.local().plus({ days: 7 }).toISO(),
      }),
    );

    return visible;
  }

  getNewsVisible() {
    try {
      const config = JSON.parse(String(localStorage.getItem('news_config')));
      const visible = config.visible;
      const expiredAt = DateTime.fromISO(config.expiredAt);

      if (typeof visible !== 'boolean' || !expiredAt.isValid) {
        throw new Error('Invalid config');
      }

      if (expiredAt < DateTime.local()) {
        throw new Error('Expired config');
      }

      return visible;
    } catch (e) {
      return true;
    }
  }
}

export const localStorageService = new LocalStorageService();
