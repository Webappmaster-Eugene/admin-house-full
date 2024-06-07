export class AuthRefreshKeysEntity {
  accessToken: string;
  refreshToken: string;

  constructor(authRefreshKeys: AuthRefreshKeysEntity) {
    this.accessToken = authRefreshKeys.accessToken;
    this.refreshToken = authRefreshKeys.refreshToken;
    return this;
  }
}
