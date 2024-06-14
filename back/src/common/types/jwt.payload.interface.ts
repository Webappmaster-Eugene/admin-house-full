export interface IJWTPayload {
  uuid: string;
  email: string;
  roleId: string;
  iat: number;
  exp: number;
}

export interface IJWTRefreshPayload {
  uuid: string;
  email: string;
  iat: number;
  exp: number;
}
