import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingDeleteResponseSchema = z
  .object({
    data: PriceChangingSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = PriceChangingDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
