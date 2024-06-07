import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialCreateRequestSchema = CharacteristicsMaterialSchema.pick({
  name: true,
  value: true,
  comment: true,
});

const CharacteristicsMaterialCreateResponseSchema = z
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

export namespace CharacteristicsMaterialCreateCommand {
  export const RequestSchema = CharacteristicsMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
