import { z } from 'zod';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const OrganizationCreateRequestSchema = OrganizationSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
  organizationLeaderUuid: true,
  workspaceUuid: true,
});

const OrganizationCreateResponseSchema = z
  .object({
    data: OrganizationSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace OrganizationCreateCommand {
  export const RequestSchema = OrganizationCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
