import { EUserTypeVariants } from '@prisma/client';
import { RolesRequestDto } from './dto/role.dto';
import { RoleEntity } from './entities/role.entity';

export interface RolesServiceInterface {
  createRole: (body: RolesRequestDto) => Promise<RoleEntity>;
  getAllRoles: () => Promise<RoleEntity[]>;
  getRoleByValue: (value: EUserTypeVariants) => Promise<RoleEntity>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
