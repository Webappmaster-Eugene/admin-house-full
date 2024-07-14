import { z } from 'zod';
import { OrganizationBusinessValueSchema } from '../organization/organization-business-value.schema';
import { UserBusinessValueSchema } from '../user/user-business-value.schema';

export const ProjectRelatedEntitiesSchema = z.object({
  organization: OrganizationBusinessValueSchema,
  projectMembers: z.array(UserBusinessValueSchema).nullable().optional(),
  customer: UserBusinessValueSchema.nullable().optional(),
  responsibleManager: UserBusinessValueSchema,
});
