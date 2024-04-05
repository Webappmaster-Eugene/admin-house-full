import { z } from 'zod';

const OrganizationGetAllResponseSchema = z.array(
  z.object({
    uuid: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable(),
    workspaceUuid: z.string(),
    organizationLeaderUuid: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
);

export namespace OrganizationGetAllCommand {
  export const RequestSchema = OrganizationGetAllResponseSchema;
  export type Request = z.infer<typeof RequestSchema>;
}
