import { z } from 'zod';
import { RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema, StatusApproveSchema } from '../../models';

const StatusApproveGetAllResponseEntitySchema = z.array(
  StatusApproveSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
  }),
);

const StatusApproveGetAllResponseSchema = z
  .object({
    data: StatusApproveGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusApproveGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = StatusApproveGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusApproveGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
