import { z } from 'zod';
import { UserBusinessValueSchema, UserRelatedEntitiesSchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { RequestGetAllQuerySchema } from '../../models';

const UserGetAllResponseEntitySchema = z.array(UserBusinessValueSchema.merge(UserRelatedEntitiesSchema.strict()));

const UserGetAllResponseSchema = z
  .object({
    data: UserGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace UserGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = UserGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
