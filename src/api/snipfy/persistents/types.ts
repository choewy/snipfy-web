export type SnipfyGetLoginPageUrlResult = {
  url: string;
};

export type SnipfyGetSignTokenResult = {
  accessToken: string;
  refreshToken: string;
};

export type SnipfyCreateLinkResult = {
  id: string;
  expiredAt: string | null;
};
