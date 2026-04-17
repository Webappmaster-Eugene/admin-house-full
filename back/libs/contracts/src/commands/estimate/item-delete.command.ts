import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateItemBusinessValueSchema } from '../../models/estimate/estimate-item.schema';

const EstimateItemDeleteResponseEntitySchema = EstimateItemBusinessValueSchema;

const EstimateItemDeleteResponseSchema = z
  .object({
    data: EstimateItemDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateItemDeleteCommand {
  export const ResponseSchema = EstimateItemDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateItemDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
