import { z } from 'zod';

const OrganizationGetResponseSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  workspaceUuid: z.string(),
  organizationLeaderUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export namespace OrganizationGetCommand {
  export const RequestSchema = OrganizationGetResponseSchema;
  export type Request = z.infer<typeof RequestSchema>;
}
