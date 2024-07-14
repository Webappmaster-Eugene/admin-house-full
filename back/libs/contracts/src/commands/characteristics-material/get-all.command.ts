import { z } from 'zod';
import { ResponseClientSchema, RequestGetAllQuerySchema } from '../../models';
import { CharacteristicsMaterialBusinessValueSchema } from '../../models/characteristics-material/characteristics-material-business-value.schema';
import { CharacteristicsMaterialRelatedEntitiesSchema } from '../../models/characteristics-material/characteristics-material-related-entities.schema';

const CharacteristicsMaterialGetAllResponseEntitySchema = z.array(
  CharacteristicsMaterialBusinessValueSchema.merge(CharacteristicsMaterialRelatedEntitiesSchema),
);

const CharacteristicsMaterialGetAllResponseSchema = z
  .object({
    data: CharacteristicsMaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = CharacteristicsMaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
