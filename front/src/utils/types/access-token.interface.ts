import { IJWTPayload } from '@/../../back/libs/contracts';

export interface IAccessTokenInfo {
  accessToken: string;
  accessTokenInfo: IJWTPayload;
}
