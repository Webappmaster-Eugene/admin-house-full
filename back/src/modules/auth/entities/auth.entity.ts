import { EUserTypeVariants } from '.prisma/client';

export class AuthEntity {
  uuid: string;
  email: string;
  firstName: string;
  roleName: EUserTypeVariants;
  accessToken: string;
  refreshToken: string;

  constructor(auth: Partial<AuthEntity>) {
    Object.assign(this, auth);
    return this;
  }
}
