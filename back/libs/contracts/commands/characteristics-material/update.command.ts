import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialUpdateRequestSchema = CharacteristicsMaterialSchema.pick({
  name: true,
  value: true,
  comment: true,
}).partial();

const CharacteristicsMaterialUpdateResponseSchema = z
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

export namespace CharacteristicsMaterialUpdateCommand {
  export const RequestSchema = CharacteristicsMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
