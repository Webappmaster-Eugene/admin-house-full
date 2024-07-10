import { z } from 'zod';
import { OrganizationBusinessValueSchema } from '../organization';
import { UserBusinessValueSchema } from '../user';

export const ProjectRelatedEntitiesSchema = z.object({
  organization: OrganizationBusinessValueSchema,
  projectMembers: z.array(UserBusinessValueSchema).nullable().optional(),
  customer: UserBusinessValueSchema.nullable().optional(),
  responsibleManager: UserBusinessValueSchema,
});
