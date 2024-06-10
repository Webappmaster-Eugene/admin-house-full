import { z } from 'zod';
import { PriceChangingSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingGetAllResponseEntitySchema = z.array(
  PriceChangingSchema.pick({
    oldPrice: true,
    comment: true,
    newPrice: true,
    source: true,
    uuid: true,
    lastChangeByUserUuid: true,
    materialUuid: true,
  }),
);

const PriceChangingGetAllResponseSchema = z
  .object({
    data: PriceChangingGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = PriceChangingGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
