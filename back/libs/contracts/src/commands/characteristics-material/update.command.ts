import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';
import { CharacteristicsMaterialRelatedEntitiesSchema } from '../../models/characteristics-material/characteristics-material-related-entities.schema';
import { CharacteristicsMaterialBusinessValueSchema } from '../../models/characteristics-material/characteristics-material-business-value.schema';

const CharacteristicsMaterialUpdateResponseEntitySchema = CharacteristicsMaterialBusinessValueSchema.merge(
  CharacteristicsMaterialRelatedEntitiesSchema,
);

const CharacteristicsMaterialUpdateRequestSchema = CharacteristicsMaterialSchema.pick({
  value: true,
  comment: true,
  characteristicsMaterialStatus: true,
}).partial();

const CharacteristicsMaterialUpdateResponseSchema = z
  .object({
    data: CharacteristicsMaterialUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialUpdateCommand {
  export const RequestSchema = CharacteristicsMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
