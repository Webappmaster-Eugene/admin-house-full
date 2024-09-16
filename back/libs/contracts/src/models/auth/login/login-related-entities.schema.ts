import { z } from 'zod';
import { RoleBusinessValueSchema } from '../../../models/role/role-business-value.schema';

export const LoginRelatedEntitiesSchema = z.object({
  roles: z.array(RoleBusinessValueSchema).nullable().optional(),
});
