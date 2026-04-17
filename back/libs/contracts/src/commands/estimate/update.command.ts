import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateSchema } from '../../models/estimate/estimate.schema';
import { EstimateBusinessValueSchema } from '../../models/estimate/estimate-business-value.schema';

const EstimateUpdateResponseEntitySchema = EstimateBusinessValueSchema;

const EstimateUpdateRequestSchema = EstimateSchema.pick({
  name: true,
  description: true,
  defaultMarkupPercent: true,
  estimateStatus: true,
}).partial();

const EstimateUpdateResponseSchema = z
  .object({
    data: EstimateUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateUpdateCommand {
  export const RequestSchema = EstimateUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = EstimateUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
