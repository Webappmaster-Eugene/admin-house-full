import { SetMetadata } from '@nestjs/common';
import type { EUserTypeVariants } from '.prisma/client';

export const RolesSetting = (...roles: EUserTypeVariants[]) => {
  return SetMetadata('roles', roles);
};
