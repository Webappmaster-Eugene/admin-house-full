import { z } from 'zod';
import {
  CharacteristicsMaterialSchema,
  ResponseClientSchema,
  RequestGetAllQuerySchema,
  CharacteristicsMaterialRelatedEntitiesSchema,
  CharacteristicsMaterialBusinessValueSchema,
} from '../../models';

const CharacteristicsMaterialGetAllResponseEntitySchema = z.array(
  CharacteristicsMaterialBusinessValueSchema.merge(CharacteristicsMaterialRelatedEntitiesSchema.strict()),
);

const CharacteristicsMaterialGetAllResponseSchema = z
  .object({
    data: CharacteristicsMaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace CharacteristicsMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = CharacteristicsMaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
