import { z } from 'zod';
import { PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingGetResponseSchema = z
  .object({
    data: PriceChangingSchema.pick({
      oldPrice: true,
      comment: true,
      newPrice: true,
      source: true,
      uuid: true,
      lastChangeByUserUuid: true,
      materialUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingGetCommand {
  export const ResponseSchema = PriceChangingGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
