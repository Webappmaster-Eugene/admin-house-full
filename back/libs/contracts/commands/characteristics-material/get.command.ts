import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialGetResponseEntitySchema = CharacteristicsMaterialSchema.pick({
  uuid: true,
  value: true,
  name: true,
  comment: true,
  fieldOfCategoryMaterialUuid: true,
  fieldUnitMeasurementUuid: true,
  fieldTypeUuid: true,
  handbookUuid: true,
  categoryMaterialUuid: true,
  materialUuid: true,
  lastChangeByUserUuid: true,
});

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
