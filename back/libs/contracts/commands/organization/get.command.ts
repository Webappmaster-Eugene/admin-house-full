import { z } from 'zod';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationSchemaGetResponseSchema = z
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

export namespace OrganizationGetCommand {
  export const ResponseSchema = OrganizationSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
