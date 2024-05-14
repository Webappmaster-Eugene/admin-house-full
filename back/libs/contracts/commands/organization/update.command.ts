import { z } from 'zod';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationUpdateRequestSchema = OrganizationSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  workspaceUuid: true,
  organizationLeaderUuid: true,
}).partial();

const OrganizationUpdateResponseSchema = z
  .object({
    data: OrganizationSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace OrganizationUpdateCommand {
  export const RequestSchema = OrganizationUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
