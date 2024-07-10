import { z } from 'zod';
import { ResponseClientSchema, StatusApproveBusinessValueSchema, StatusApproveSchema } from '../../models';

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
  .merge(ResponseClientSchema.strict());

export namespace StatusApproveUpdateCommand {
  export const RequestSchema = StatusApproveUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = StatusApproveUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusApproveUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
