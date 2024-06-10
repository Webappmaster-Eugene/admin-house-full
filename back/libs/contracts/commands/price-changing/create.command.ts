import { z } from 'zod';
import { PriceChangingSchema, ProjectSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingCreateResponseEntitySchema = PriceChangingSchema.pick({
  oldPrice: true,
  comment: true,
  newPrice: true,
  source: true,
  uuid: true,
  lastChangeByUserUuid: true,
  materialUuid: true,
});

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
