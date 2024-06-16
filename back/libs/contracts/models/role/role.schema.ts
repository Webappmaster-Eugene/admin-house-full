import { z } from 'zod';
import { EUserVariants } from '../../enums';

export const RoleSchema = z.object({
  uuid: z.string().uuid(),
  idRole: z.number().int().optional(),
  name: EUserVariants,
  description: z.string().nullable().optional(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
