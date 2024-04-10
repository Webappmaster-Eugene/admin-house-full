import { EUserTypeVariants } from '@prisma/client';

export class AuthEntity {
  uuid: string;
  email: string;
  role?: EUserTypeVariants;
  accessToken: string;

  constructor(auth: Partial<AuthEntity>) {
    Object.assign(this, auth);
    return this;
  }
}
