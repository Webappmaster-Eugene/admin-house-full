import { z } from 'zod';
import { OrganizationBusinessValueSchema } from '../../../models/organization/organization-business-value.schema';

export const UserMemberOfOrganizationsSchema = z.object({
  memberOfOrganizations: z.array(OrganizationBusinessValueSchema).nullable().optional(),
});
