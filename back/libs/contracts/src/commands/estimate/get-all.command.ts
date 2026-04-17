import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { EstimateBusinessValueSchema } from '../../models/estimate/estimate-business-value.schema';

const EstimateGetAllResponseEntitySchema = z.array(EstimateBusinessValueSchema);

const EstimateGetAllResponseSchema = z
  .object({
    data: EstimateGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = EstimateGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
