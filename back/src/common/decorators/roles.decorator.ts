import { SetMetadata } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';

export const RolesSetting = (...roles: EUserTypeVariants[]) => {
  return SetMetadata('roles', roles);
};
