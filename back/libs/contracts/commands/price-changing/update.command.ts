import { z } from 'zod';
import { PriceChangingBusinessValueSchema, PriceChangingRelatedEntitiesSchema, PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingUpdateResponseEntitySchema = PriceChangingBusinessValueSchema.merge(PriceChangingRelatedEntitiesSchema.strict());

const PriceChangingUpdateRequestSchema = PriceChangingSchema.pick({
  source: true,
  comment: true,
  newPrice: true,
}).partial();

const PriceChangingUpdateResponseSchema = z
  .object({
    data: PriceChangingUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace PriceChangingUpdateCommand {
  export const RequestSchema = PriceChangingUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = PriceChangingUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
