import { z } from 'zod';
import { StatusApproveBusinessValueSchema } from '../../models/status-approve/status-approve-business-value.schema';
import { ResponseClientSchema, StatusApproveSchema } from '../../models';

const StatusApproveCreateResponseEntitySchema = StatusApproveBusinessValueSchema;

const StatusApproveCreateRequestSchema = StatusApproveSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
});

const StatusApproveCreateResponseSchema = z
  .object({
    data: StatusApproveCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusApproveCreateCommand {
  export const RequestSchema = StatusApproveCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = StatusApproveCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusApproveCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
