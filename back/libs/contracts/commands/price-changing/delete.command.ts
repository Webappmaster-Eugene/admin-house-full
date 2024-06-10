import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingDeleteResponseEntitySchema = PriceChangingSchema.pick({
  oldPrice: true,
  comment: true,
  newPrice: true,
  source: true,
  uuid: true,
  lastChangeByUserUuid: true,
  materialUuid: true,
});

const PriceChangingDeleteResponseSchema = z
  .object({
    data: PriceChangingDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = PriceChangingDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PriceChangingDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
