export interface JWTPayload {
  email: string;
  uuid: string;
  iat: number;
  exp: number;
}
