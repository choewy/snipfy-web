import { create } from 'zustand';
import { DateTime } from 'luxon';

import { URL_REGEX } from '../persistents/regex';
import { NotiStackEvent } from '../persistents/events/noti-stack.event';
import { configService } from '../core/config/config.service';
import { snipfyApiService } from '../api/snipfy/snipfy-api.service';
import { qrCodeService } from '../utils/qrcode.service';

export type CreateLinkStore = {
  open: boolean;
  status: 'pending' | 'success' | 'error';
  url: string;
  linkUrl: string;
  qrCodeUrl: string;
  expiredAt: string | null;
  copied: {
    link: boolean;
    qrCode: boolean;
  };
  change: (url: string) => void;
  create: (url: string) => Promise<void>;
  closeModal: () => void;
  copyLink: () => void;
  copyQrCode: () => void;
};

export const useCreateLinkStore = create<CreateLinkStore>((set) => ({
  open: false,
  status: 'pending',
  url: '',
  linkUrl: '',
  qrCodeUrl: '',
  expiredAt: null,
  copied: {
    link: false,
    qrCode: false,
  },
  change: (url: string) => {
    if (
      ['', 'h', 'ht', 'htt', 'http', 'https', 'http:', 'https:', 'http:/', 'https:/', 'http://', 'https://'].includes(url) ||
      url.length === 0 ||
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return set({ url });
    }

    set({ url: `https://${url}` });
  },
  create: async (url: string) => {
    url = url.trim();

    if (url.length === 0) {
      NotiStackEvent.warning('URL을 입력해주세요.');

      return set({ open: false, status: 'error' });
    }

    if (!URL_REGEX.test(url)) {
      NotiStackEvent.warning('URL 형식에 맞지 않습니다.');

      return set({ open: false, status: 'error' });
    }

    set({ open: true, status: 'pending' });

    const createLinkResult = await snipfyApiService.createLink(url);

    if (!createLinkResult.ok) {
      switch (createLinkResult.error?.statusCode) {
        case 400:
          NotiStackEvent.warning('URL 형식에 맞지 않습니다.');
          break;

        default:
          NotiStackEvent.error(createLinkResult.error?.message ?? '서버 오류가 발생하였습니다.');
          break;
      }

      return set({ open: false, status: 'error' });
    }

    const linkUrl = `${configService.getSnipfyGatewayUrl()}/${createLinkResult.data.linkId}`;
    const qrCodeUrl = await qrCodeService.toDataURL(linkUrl);
    const expiredAt = createLinkResult.data.expiredAt ? DateTime.fromISO(createLinkResult.data.expiredAt).toFormat('yyyy-MM-dd') : null;

    set({ open: true, status: 'success', linkUrl, qrCodeUrl, expiredAt });
  },
  closeModal: () => {
    set({ open: false, url: '' });
  },
  copyLink: () => set({ copied: { link: true, qrCode: false } }),
  copyQrCode: () => set({ copied: { link: false, qrCode: true } }),
}));
