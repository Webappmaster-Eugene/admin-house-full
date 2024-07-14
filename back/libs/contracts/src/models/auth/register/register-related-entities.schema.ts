import { z } from 'zod';
import { RoleSchema } from '../../role/role.schema';

export const RegisterRelatedEntitiesSchema = z.object({
  role: RoleSchema,
});
