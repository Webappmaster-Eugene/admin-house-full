import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { PriceChangingRelatedEntitiesSchema } from '../../models/price-changing/price-changing-related-entities.schema';
import { PriceChangingBusinessValueSchema } from '../../models/price-changing/price-changing-business-value.schema';

const PriceChangingDeleteResponseEntitySchema = PriceChangingBusinessValueSchema.merge(PriceChangingRelatedEntitiesSchema);

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
