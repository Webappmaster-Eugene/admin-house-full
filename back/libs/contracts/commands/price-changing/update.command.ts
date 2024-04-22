import { z } from 'zod';
import { PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingUpdateRequestSchema = PriceChangingSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  changedByUuid: true,
  materialUuid: true,
}).partial();

const PriceChangingUpdateResponseSchema = z
  .object({
    data: PriceChangingSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingUpdateCommand {
  export const RequestSchema = PriceChangingUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = PriceChangingUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
