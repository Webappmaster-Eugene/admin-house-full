export type AxiosInterceptorProps = {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  getIsRefreshSent: () => boolean;
  setAccessToken: (value: string) => void;
  setRefreshToken: (value: string) => void;
  setIsRefreshSent: (value: boolean) => void;
  removeAuthTokens: () => void;
};