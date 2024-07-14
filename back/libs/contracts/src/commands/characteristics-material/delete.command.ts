import { z } from 'zod';
import { EntityUrlParamCommand } from '../common';
import { ResponseClientSchema } from '../../models';
import { CharacteristicsMaterialRelatedEntitiesSchema } from '../../models/characteristics-material/characteristics-material-related-entities.schema';
import { CharacteristicsMaterialBusinessValueSchema } from '../../models/characteristics-material/characteristics-material-business-value.schema';

const CharacteristicsMaterialDeleteResponseEntitySchema = CharacteristicsMaterialBusinessValueSchema.merge(
  CharacteristicsMaterialRelatedEntitiesSchema,
);

const CharacteristicsMaterialDeleteResponseSchema = z
  .object({
    data: CharacteristicsMaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = CharacteristicsMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
