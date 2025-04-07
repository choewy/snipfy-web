import { LinkComponentCreateLinkStatus } from './enums';

export type LinkComponentCreateLinkResultStateType = {
  status: LinkComponentCreateLinkStatus;
  linkUrl: string;
  qrCodeUrl: string;
  expiredAt: string | null;
};
