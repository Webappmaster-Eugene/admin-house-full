import { z } from 'zod';
import { RequestGetAllQuerySchema, RoleSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const RoleGetAllResponseEntitySchema = z.array(
  RoleSchema.pick({
    uuid: true,
    idRole: true,
    name: true,
    description: true,
    lastChangeByUserUuid: true,
  }),
);

const RoleGetAllResponseSchema = z
  .object({
    data: RoleGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace RoleGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = RoleGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = RoleGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
