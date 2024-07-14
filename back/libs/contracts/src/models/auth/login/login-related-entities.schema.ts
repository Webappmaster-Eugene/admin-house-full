import { z } from 'zod';
import { RoleSchema } from '../../role/role.schema';

export const LoginRelatedEntitiesSchema = z.object({
  role: RoleSchema,
});
