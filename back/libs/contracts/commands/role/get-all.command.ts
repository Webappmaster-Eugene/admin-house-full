import { z } from 'zod';
import { RequestGetAllQuerySchema, RoleSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const RoleGetAllResponseSchema = z
  .object({
    data: z.array(
      RoleSchema.pick({
        uuid: true,
        idRole: true,
        name: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace RoleGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = RoleGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
