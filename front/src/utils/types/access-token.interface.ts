import { IJWTPayload } from '@numart/house-admin-contracts';

export interface IAccessTokenInfo {
  accessToken: string;
  accessTokenInfo: IJWTPayload;
}
