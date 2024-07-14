import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { PriceChangingRelatedEntitiesSchema } from '../../models/price-changing/price-changing-related-entities.schema';
import { PriceChangingBusinessValueSchema } from '../../models/price-changing/price-changing-business-value.schema';

const PriceChangingGetAllResponseEntitySchema = z.array(PriceChangingBusinessValueSchema.merge(PriceChangingRelatedEntitiesSchema));

const PriceChangingGetAllResponseSchema = z
  .object({
    data: PriceChangingGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = PriceChangingGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
