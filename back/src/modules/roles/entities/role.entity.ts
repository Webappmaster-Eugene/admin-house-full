import { EUserTypeVariants, Role } from '@prisma/client';

export class RoleEntity implements Role {
  uuid: string;
  idRole: number;
  name: EUserTypeVariants;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: number;

  constructor(role: Partial<Role>) {
    Object.assign(this, role);
    return this;
  }
}
