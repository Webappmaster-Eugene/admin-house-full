import { z } from 'zod';
import { EntityUrlParamCommand } from '../common';
import {
  CharacteristicsMaterialBusinessValueSchema,
  CharacteristicsMaterialRelatedEntitiesSchema,
  CharacteristicsMaterialSchema,
  ResponseClientSchema,
} from '../../models';

const CharacteristicsMaterialDeleteResponseEntitySchema = CharacteristicsMaterialBusinessValueSchema.merge(
  CharacteristicsMaterialRelatedEntitiesSchema.strict(),
);

const CharacteristicsMaterialDeleteResponseSchema = z
  .object({
    data: CharacteristicsMaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace CharacteristicsMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = CharacteristicsMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
