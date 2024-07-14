import { z } from 'zod';
import { PriceChangingSchema, ResponseClientSchema } from '../../models';
import { PriceChangingBusinessValueSchema } from '../../models/price-changing/price-changing-business-value.schema';
import { PriceChangingRelatedEntitiesSchema } from '../../models/price-changing/price-changing-related-entities.schema';

const PriceChangingCreateResponseEntitySchema = PriceChangingBusinessValueSchema.merge(PriceChangingRelatedEntitiesSchema);

const PriceChangingCreateRequestSchema = PriceChangingSchema.pick({
  oldPrice: true,
  comment: true,
  newPrice: true,
  source: true,
});

const PriceChangingCreateResponseSchema = z
  .object({
    data: PriceChangingCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingCreateCommand {
  export const RequestSchema = PriceChangingCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = PriceChangingCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
