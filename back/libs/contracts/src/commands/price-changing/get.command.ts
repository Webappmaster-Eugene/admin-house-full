import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { PriceChangingBusinessValueSchema } from '../../models/price-changing/price-changing-business-value.schema';
import { PriceChangingRelatedEntitiesSchema } from '../../models/price-changing/price-changing-related-entities.schema';

const PriceChangingGetResponseEntitySchema = PriceChangingBusinessValueSchema.merge(PriceChangingRelatedEntitiesSchema);

const PriceChangingGetResponseSchema = z
  .object({
    data: PriceChangingGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingGetCommand {
  export const BusinessValueSchema = PriceChangingBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const ResponseSchema = PriceChangingGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
