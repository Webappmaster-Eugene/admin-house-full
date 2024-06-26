import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema, RequestGetAllQuerySchema } from '../../models';

const CharacteristicsMaterialGetAllResponseEntitySchema = z.array(
  CharacteristicsMaterialSchema.pick({
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
  }),
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
