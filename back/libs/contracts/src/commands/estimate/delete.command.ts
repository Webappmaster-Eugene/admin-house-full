import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateBusinessValueSchema } from '../../models/estimate/estimate-business-value.schema';

const EstimateDeleteResponseEntitySchema = EstimateBusinessValueSchema;

const EstimateDeleteResponseSchema = z
  .object({
    data: EstimateDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateDeleteCommand {
  export const ResponseSchema = EstimateDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
