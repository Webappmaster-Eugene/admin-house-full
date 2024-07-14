import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { RequestGetAllQuerySchema } from '../../models';
import { UserBusinessValueSchema } from '../../models/user/user-business-value.schema';
import { UserRelatedEntitiesSchema } from '../../models/user/user-related-entities.schema';

const UserGetAllResponseEntitySchema = z.array(UserBusinessValueSchema.merge(UserRelatedEntitiesSchema));

const UserGetAllResponseSchema = z
  .object({
    data: UserGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = UserGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
