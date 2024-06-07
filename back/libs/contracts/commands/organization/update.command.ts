import { z } from 'zod';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationUpdateRequestSchema = OrganizationSchema.pick({
  name: true,
  description: true,
}).partial();

const OrganizationUpdateResponseSchema = z
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

export namespace OrganizationUpdateCommand {
  export const RequestSchema = OrganizationUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
