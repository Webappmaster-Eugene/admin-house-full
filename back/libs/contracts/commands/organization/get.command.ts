import { z } from 'zod';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationSchemaGetResponseSchema = z
  .object({
    data: OrganizationSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace OrganizationGetCommand {
  export const ResponseSchema = OrganizationSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
