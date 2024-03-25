import { EUserTypeVariants } from '@prisma/client';
import { RolesRequestDto, RolesResponseDto } from './dto/role.dto';

export interface RolesServiceInterface {
  createRole: (body: RolesRequestDto) => Promise<RolesResponseDto>;
  getAllRoles: () => Promise<RolesResponseDto[]>;
  getRoleByValue: (value: EUserTypeVariants) => Promise<RolesResponseDto>;
}
