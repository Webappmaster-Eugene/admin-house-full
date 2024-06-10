import { z } from 'zod';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationGetResponseEntitySchema = OrganizationSchema.pick({
  uuid: true,
  name: true,
  description: true,
  organizationLeaderUuid: true,
  workspaceUuid: true,
  lastChangeByUserUuid: true,
});

const OrganizationSchemaGetResponseSchema = z
  .object({
    data: OrganizationGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace OrganizationGetCommand {
  export const ResponseSchema = OrganizationSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
