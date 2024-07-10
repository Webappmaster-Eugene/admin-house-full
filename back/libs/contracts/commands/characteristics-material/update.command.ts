import { z } from 'zod';
import {
  CharacteristicsMaterialBusinessValueSchema,
  CharacteristicsMaterialRelatedEntitiesSchema,
  CharacteristicsMaterialSchema,
  ResponseClientSchema,
} from '../../models';

const CharacteristicsMaterialUpdateResponseEntitySchema = CharacteristicsMaterialBusinessValueSchema.merge(
  CharacteristicsMaterialRelatedEntitiesSchema.strict(),
);

const CharacteristicsMaterialUpdateRequestSchema = CharacteristicsMaterialSchema.pick({
  name: true,
  value: true,
  comment: true,
}).partial();

const CharacteristicsMaterialUpdateResponseSchema = z
  .object({
    data: CharacteristicsMaterialUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace CharacteristicsMaterialUpdateCommand {
  export const RequestSchema = CharacteristicsMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
