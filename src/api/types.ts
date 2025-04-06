export type SocialLoginPageUrlResponse = {
  url: string;
};

export type CreateLinkResponse = {
  id: string;
  type: 'free' | 'plan';
  url: string;
  expiredAt: string;
  hitCount: number;
};
