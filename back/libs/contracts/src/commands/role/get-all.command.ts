import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { RoleBusinessValueSchema } from '../../models/role/role-business-value.schema';

const RoleGetAllResponseEntitySchema = z.array(RoleBusinessValueSchema);

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
