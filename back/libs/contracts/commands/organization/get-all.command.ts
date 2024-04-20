import { z } from 'zod';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const OrganizationGetAllResponseSchema = z
  .object({
    data: z.array(
      OrganizationSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace OrganizationGetAllCommand {
  export const ResponseSchema = OrganizationGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
