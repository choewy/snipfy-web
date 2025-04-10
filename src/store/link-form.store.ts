import { create } from 'zustand';
import { snipfySignApiService } from '../api/snipfy/snipfy-api.service';
import { configService } from '../core/config/config.service';
import { qrCodeService } from '../utils/qrcode.service';
import { DateTime } from 'luxon';

export const useLinkFormStore = create<{
  modalOpen: boolean;
  status: 'pending' | 'success' | 'error';
  linkUrl: string;
  qrCodeUrl: string;
  expiredAt: string | null;
  errorMessage: string | null;
  create: (url: string) => Promise<void>;
  reset: () => void;
  closeModal: () => void;
}>((set) => ({
  modalOpen: false,
  status: 'pending',
  linkUrl: '',
  qrCodeUrl: '',
  expiredAt: null,
  errorMessage: null,
  create: async (url: string) => {
    set({ status: 'pending' });

    const createLinkResult = await snipfySignApiService.createLink(url);

    let status: 'pending' | 'success' | 'error' = 'pending';
    let errorMessage = '';
    let linkUrl = '';
    let qrCodeUrl = '';
    let expiredAt = null;

    if (createLinkResult.ok) {
      status = 'success';
      linkUrl = `${configService.getSnipfyGatewayUrl()}/${createLinkResult.data.linkId}`;
      qrCodeUrl = await qrCodeService.toDataURL(linkUrl);
      expiredAt = createLinkResult.data.expiredAt ? DateTime.fromISO(createLinkResult.data.expiredAt).toFormat('yyyy-MM-dd') : null;
    } else {
      status = 'error';
      errorMessage = createLinkResult.error?.message ?? '단축 링크 생성을 실패하였습니다.';
    }

    set({ modalOpen: true, status, linkUrl, qrCodeUrl, expiredAt, errorMessage });
  },
  reset: () => {
    set({ modalOpen: false, status: 'pending', linkUrl: '', qrCodeUrl: '', expiredAt: null, errorMessage: null });
  },
  closeModal: () => {
    set({ modalOpen: false });
  },
}));
