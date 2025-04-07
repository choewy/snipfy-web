export type SnipfyGetLoginPageUrlResult = {
  url: string;
};

export type SnipfyGetSignTokenResult = {
  accessToken: string;
  refreshToken: string;
};

export type SnipfyCreateLinkResult = {
  linkId: string;
  expiredAt: string | null;
};
