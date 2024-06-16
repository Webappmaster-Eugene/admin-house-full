import { IAccessTokenInfo } from 'src/api/actions/auth-actions/get-current-tokens.action';

export function isAccessTokenInfo(
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
