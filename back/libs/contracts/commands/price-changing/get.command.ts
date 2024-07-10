import { z } from 'zod';
import { PriceChangingBusinessValueSchema, PriceChangingRelatedEntitiesSchema, PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingGetResponseEntitySchema = PriceChangingBusinessValueSchema.merge(PriceChangingRelatedEntitiesSchema.strict());

const PriceChangingGetResponseSchema = z
  .object({
    data: PriceChangingGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace PriceChangingGetCommand {
  export const ResponseSchema = PriceChangingGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
