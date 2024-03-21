import { SetMetadata } from '@nestjs/common';
import { UserType } from '@prisma/client';

export const RolesSetting = (...roles: UserType[]) => {
  return SetMetadata('roles', roles);
};
