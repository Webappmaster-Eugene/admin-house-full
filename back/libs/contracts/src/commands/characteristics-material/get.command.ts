import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { CharacteristicsMaterialBusinessValueSchema } from '../../models/characteristics-material/characteristics-material-business-value.schema';
import { CharacteristicsMaterialRelatedEntitiesSchema } from '../../models/characteristics-material/characteristics-material-related-entities.schema';

const CharacteristicsMaterialGetResponseEntitySchema = CharacteristicsMaterialBusinessValueSchema.merge(
  CharacteristicsMaterialRelatedEntitiesSchema,
);

const CharacteristicsMaterialGetResponseSchema = z
  .object({
    data: CharacteristicsMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialGetCommand {
  export const ResponseSchema = CharacteristicsMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
