import { z } from 'zod';
import { ResponseClientSchema, StatusApproveSchema } from '../../models';

const StatusApproveUpdateResponseEntitySchema = StatusApproveSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});

const StatusApproveUpdateRequestSchema = StatusApproveSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
}).partial();

const StatusApproveUpdateResponseSchema = z
  .object({
    data: StatusApproveUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusApproveUpdateCommand {
  export const RequestSchema = StatusApproveUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = StatusApproveUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusApproveUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
