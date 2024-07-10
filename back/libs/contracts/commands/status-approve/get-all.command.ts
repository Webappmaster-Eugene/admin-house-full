import { z } from 'zod';
import { RequestGetAllQuerySchema, StatusApproveBusinessValueSchema } from '../../models';
import { ResponseClientSchema, StatusApproveSchema } from '../../models';

const StatusApproveGetAllResponseEntitySchema = z.array(StatusApproveBusinessValueSchema);

const StatusApproveGetAllResponseSchema = z
  .object({
    data: StatusApproveGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace StatusApproveGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = StatusApproveGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusApproveGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
