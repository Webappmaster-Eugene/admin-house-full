import { z } from 'zod';
import {
  PriceChangingBusinessValueSchema,
  PriceChangingRelatedEntitiesSchema,
  PriceChangingSchema,
  RequestGetAllQuerySchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingGetAllResponseEntitySchema = z.array(
  PriceChangingBusinessValueSchema.merge(PriceChangingRelatedEntitiesSchema.strict()),
);

const PriceChangingGetAllResponseSchema = z
  .object({
    data: PriceChangingGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace PriceChangingGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = PriceChangingGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
