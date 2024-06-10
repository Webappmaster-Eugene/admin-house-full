import { z } from 'zod';
import { PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingGetResponseEntitySchema = PriceChangingSchema.pick({
  oldPrice: true,
  comment: true,
  newPrice: true,
  source: true,
  uuid: true,
  lastChangeByUserUuid: true,
  materialUuid: true,
});

const PriceChangingGetResponseSchema = z
  .object({
    data: PriceChangingGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingGetCommand {
  export const ResponseSchema = PriceChangingGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
