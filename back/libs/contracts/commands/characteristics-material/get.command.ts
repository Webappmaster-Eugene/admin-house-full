import { z } from 'zod';
import {
  CharacteristicsMaterialBusinessValueSchema,
  CharacteristicsMaterialRelatedEntitiesSchema,
  CharacteristicsMaterialSchema,
  ResponseClientSchema,
} from '../../models';

const CharacteristicsMaterialGetResponseEntitySchema = CharacteristicsMaterialBusinessValueSchema.merge(
  CharacteristicsMaterialRelatedEntitiesSchema.strict(),
);

const CharacteristicsMaterialGetResponseSchema = z
  .object({
    data: CharacteristicsMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace CharacteristicsMaterialGetCommand {
  export const ResponseSchema = CharacteristicsMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
