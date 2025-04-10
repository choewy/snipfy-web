import { create } from 'zustand';
import { DateTime } from 'luxon';

import { URL_REGEX } from '../persistents/regex';
import { AlertModalEvent } from '../persistents/events/alert-modal.event';
import { configService } from '../core/config/config.service';
import { snipfySignApiService } from '../api/snipfy/snipfy-api.service';
import { qrCodeService } from '../utils/qrcode.service';
import { NotiStackEvent } from '../persistents/events/noti-stack.event';

export type CreateLinkResultStore = {
  open: boolean;
  status: 'pending' | 'success' | 'error';
  linkUrl: string;
  qrCodeUrl: string;
  expiredAt: string | null;
  create: (url: string) => Promise<void>;
  reset: () => void;
  closeModal: () => void;
};

export const useCreateLinkResultStore = create<CreateLinkResultStore>((set) => ({
  open: false,
  status: 'pending',
  linkUrl: '',
  qrCodeUrl: '',
  expiredAt: null,
  create: async (url: string) => {
    url = url.trim();

    if (url.length === 0) {
      set({ open: false, status: 'error' });

      return AlertModalEvent.open('링크 생성 실패', 'URL을 입력해주세요.');
    }

    if (!URL_REGEX.test(url)) {
      set({ open: false, status: 'error' });

      return AlertModalEvent.open('링크 생성 실패', 'URL 형식에 맞지 않습니다.');
    }

    set({ open: true, status: 'pending' });

    const createLinkResult = await snipfySignApiService.createLink(url);

    if (!createLinkResult.ok) {
      if (typeof createLinkResult.error?.statusCode === 'number') {
        AlertModalEvent.open('링크 생성 실패', '단축 링크 생성을 실패하였습니다.');
      } else {
        NotiStackEvent.error(createLinkResult.error?.message ?? '');
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
