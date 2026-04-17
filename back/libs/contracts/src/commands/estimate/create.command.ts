import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateSchema } from '../../models/estimate/estimate.schema';
import { EstimateBusinessValueSchema } from '../../models/estimate/estimate-business-value.schema';

const EstimateCreateResponseEntitySchema = EstimateBusinessValueSchema;

const EstimateCreateRequestSchema = EstimateSchema.pick({
  name: true,
  description: true,
  defaultMarkupPercent: true,
}).partial({ description: true, defaultMarkupPercent: true });

const EstimateCreateResponseSchema = z
  .object({
    data: EstimateCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateCreateCommand {
  export const RequestSchema = EstimateCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = EstimateCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
