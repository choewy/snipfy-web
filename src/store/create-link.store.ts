import { create } from 'zustand';
import { DateTime } from 'luxon';

import { URL_REGEX } from '../persistents/regex';
import { NotiStackEvent } from '../persistents/events/noti-stack.event';
import { configService } from '../core/config/config.service';
import { snipfySignApiService } from '../api/snipfy/snipfy-api.service';
import { qrCodeService } from '../utils/qrcode.service';

export type CreateLinkStore = {
  open: boolean;
  status: 'pending' | 'success' | 'error';
  linkUrl: string;
  qrCodeUrl: string;
  expiredAt: string | null;
  create: (url: string) => Promise<void>;
  reset: () => void;
  closeModal: () => void;
};

export const useCreateLinkStore = create<CreateLinkStore>((set) => ({
  open: false,
  status: 'pending',
  linkUrl: '',
  qrCodeUrl: '',
  expiredAt: null,
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

    const createLinkResult = await snipfySignApiService.createLink(url);

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
  reset: () => {
    set({ open: false, status: 'pending', linkUrl: '', qrCodeUrl: '', expiredAt: null });
  },
  closeModal: () => {
    set({ open: false });
  },
}));
