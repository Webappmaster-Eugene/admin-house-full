import { IAccessTokenInfo } from 'src/utils/types/access-token.interface';

export function isAccessTokenInfoTypeGuard(
  accessTokenWithInfo: IAccessTokenInfo | unknown | null
): accessTokenWithInfo is IAccessTokenInfo {
  if (
    accessTokenWithInfo &&
    typeof accessTokenWithInfo === 'object' &&
    'accessToken' in accessTokenWithInfo
  ) {
    return true;
  }
  return false;
}
