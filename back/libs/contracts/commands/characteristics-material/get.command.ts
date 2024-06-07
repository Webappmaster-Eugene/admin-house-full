import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialGetResponseSchema = z
  .object({
    data: CharacteristicsMaterialSchema.pick({
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
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialGetCommand {
  export const ResponseSchema = CharacteristicsMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
