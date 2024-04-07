import { EUserTypeVariants, Role } from '@prisma/client';

export class RoleEntity implements Role {
  uuid: string;
  idRole: number;
  name: EUserTypeVariants;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(project: Partial<Role>) {
    Object.assign(this, project);
    return this;
  }
}
