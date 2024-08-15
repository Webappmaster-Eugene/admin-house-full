import { OrganizationSchema } from './organization.schema';

export const OrganizationBusinessValueSchema = OrganizationSchema.pick({
  uuid: true,
  name: true,
  description: true,
  organizationStatus: true,
  organizationLeaderUuid: true,
  workspaceUuid: true,
  lastChangeByUserUuid: true,
});
