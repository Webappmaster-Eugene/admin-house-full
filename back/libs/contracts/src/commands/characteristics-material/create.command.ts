import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';
import { CharacteristicsMaterialBusinessValueSchema } from '../../models/characteristics-material/characteristics-material-business-value.schema';
import { CharacteristicsMaterialRelatedEntitiesSchema } from '../../models/characteristics-material/characteristics-material-related-entities.schema';

const CharacteristicsMaterialCreateResponseEntitySchema = CharacteristicsMaterialBusinessValueSchema.merge(
  CharacteristicsMaterialRelatedEntitiesSchema,
);

const CharacteristicsMaterialCreateRequestSchema = CharacteristicsMaterialSchema.pick({
  value: true,
  characteristicsMaterialStatus: true,
  comment: true,
});

const CharacteristicsMaterialCreateResponseSchema = z
  .object({
    data: CharacteristicsMaterialCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialCreateCommand {
  export const RequestSchema = CharacteristicsMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
