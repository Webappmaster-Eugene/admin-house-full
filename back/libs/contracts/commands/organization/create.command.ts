import { z } from 'zod';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationCreateRequestSchema = OrganizationSchema.pick({
  name: true,
  description: true,
});

const OrganizationCreateResponseSchema = z
  .object({
    data: OrganizationSchema.pick({
      uuid: true,
      name: true,
      description: true,
      organizationLeaderUuid: true,
      workspaceUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace OrganizationCreateCommand {
  export const RequestSchema = OrganizationCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
