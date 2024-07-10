import { z } from 'zod';
import {
  CharacteristicsMaterialBusinessValueSchema,
  CharacteristicsMaterialRelatedEntitiesSchema,
  CharacteristicsMaterialSchema,
  ResponseClientSchema,
} from '../../models';

const CharacteristicsMaterialCreateResponseEntitySchema = CharacteristicsMaterialBusinessValueSchema.merge(
  CharacteristicsMaterialRelatedEntitiesSchema.strict(),
);

const CharacteristicsMaterialCreateRequestSchema = CharacteristicsMaterialSchema.pick({
  name: true,
  value: true,
  comment: true,
});

const CharacteristicsMaterialCreateResponseSchema = z
  .object({
    data: CharacteristicsMaterialCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace CharacteristicsMaterialCreateCommand {
  export const RequestSchema = CharacteristicsMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
