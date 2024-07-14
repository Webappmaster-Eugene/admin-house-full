import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { StatusApproveBusinessValueSchema } from '../../models/status-approve/status-approve-business-value.schema';

const StatusApproveGetAllResponseEntitySchema = z.array(StatusApproveBusinessValueSchema);

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
