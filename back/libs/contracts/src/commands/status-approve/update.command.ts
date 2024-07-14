import { z } from 'zod';
import { ResponseClientSchema, StatusApproveSchema } from '../../models';
import { StatusApproveBusinessValueSchema } from '../../models/status-approve/status-approve-business-value.schema';

const StatusApproveUpdateResponseEntitySchema = StatusApproveBusinessValueSchema;

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
