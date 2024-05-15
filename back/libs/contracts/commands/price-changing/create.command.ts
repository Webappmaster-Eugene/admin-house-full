import { z } from 'zod';
import { PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingCreateRequestSchema = PriceChangingSchema.omit({
  uuid: true,
  materialUuid: true,
  changedByUuid: true,
  createdAt: true,
  updatedAt: true,
});

const PriceChangingCreateResponseSchema = z
  .object({
    data: PriceChangingSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingCreateCommand {
  export const RequestSchema = PriceChangingCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = PriceChangingCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
