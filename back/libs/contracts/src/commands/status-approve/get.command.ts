import { z } from 'zod';
import { StatusApproveBusinessValueSchema } from '../../models/status-approve/status-approve-business-value.schema';
import { ResponseClientSchema } from '../../models';

const StatusApproveGetResponseEntitySchema = StatusApproveBusinessValueSchema;

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
