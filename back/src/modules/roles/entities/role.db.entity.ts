import { EUserTypeVariants, Role } from '@prisma/client';

export class RoleDbEntity implements Role {
  uuid: string;
  idRole: number;
  name: EUserTypeVariants;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: number;
}
