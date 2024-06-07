import { z } from 'zod';
import { PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingUpdateRequestSchema = PriceChangingSchema.pick({
  source: true,
  comment: true,
  newPrice: true,
}).partial();

const PriceChangingUpdateResponseSchema = z
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

export namespace PriceChangingUpdateCommand {
  export const RequestSchema = PriceChangingUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = PriceChangingUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
