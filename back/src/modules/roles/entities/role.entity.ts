import { EUserTypeVariants, Role } from '@prisma/client';

export class RoleEntity implements Role {
  id: number;
  name: EUserTypeVariants;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(role: Partial<Role>) {
    Object.assign(this, role);
    return this;
  }
}
