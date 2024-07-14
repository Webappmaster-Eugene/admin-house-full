import { z } from 'zod';
import { PriceChangingSchema, ResponseClientSchema } from '../../models';
import { PriceChangingBusinessValueSchema } from '../../models/price-changing/price-changing-business-value.schema';
import { PriceChangingRelatedEntitiesSchema } from '../../models/price-changing/price-changing-related-entities.schema';

const PriceChangingUpdateResponseEntitySchema = PriceChangingBusinessValueSchema.merge(PriceChangingRelatedEntitiesSchema);

const PriceChangingUpdateRequestSchema = PriceChangingSchema.pick({
  source: true,
  comment: true,
  newPrice: true,
  oldPrice: true,
}).partial();

const PriceChangingUpdateResponseSchema = z
  .object({
    data: PriceChangingUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingUpdateCommand {
  export const RequestSchema = PriceChangingUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = PriceChangingUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
