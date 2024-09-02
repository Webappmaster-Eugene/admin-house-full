import { EActiveStatuses } from '.prisma/client';

export interface IJWTPayload {
  uuid: string;
  email: string;
  roleIds: number[];
  iat: number;
  exp: number;
}

export interface IJWTRefreshPayload {
  uuid: string;
  email: string;
  roleIds: number[];
  userStatus: EActiveStatuses;
  iat: number;
  exp: number;
}
