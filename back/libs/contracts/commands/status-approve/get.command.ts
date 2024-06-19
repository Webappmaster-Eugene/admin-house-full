import { z } from 'zod';
import { ResponseClientSchema, StatusApproveSchema } from '../../models';

const StatusApproveGetResponseEntitySchema = StatusApproveSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});

const StatusApproveGetResponseSchema = z
  .object({
    data: StatusApproveGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusApproveGetCommand {
  export const ResponseSchema = StatusApproveGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusApproveGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
