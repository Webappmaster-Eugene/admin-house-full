export interface IJWTPayload {
  uuid: string;
  email: string;
  roleId: string;
  iat: number;
  exp: number;
}
