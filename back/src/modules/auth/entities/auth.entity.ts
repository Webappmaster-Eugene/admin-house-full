import { EUserTypeVariants, Auth } from '@prisma/client';

export class AuthEntity implements Auth {
  uuid: string;
  idAuth: number;
  name: EUserTypeVariants;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(role: Partial<Auth>) {
    Object.assign(this, role);
    return this;
  }
}
