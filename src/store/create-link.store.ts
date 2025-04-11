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
  open: true,
  status: 'success',
  linkUrl: 'http://localhost:3001/Marp63f',
  qrCodeUrl:
    'data:image/png;base64,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',
  expiredAt: '2025-05-11',
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
