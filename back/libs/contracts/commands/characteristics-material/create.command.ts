import { z } from 'zod';
import { CharacteristicsMaterialSchema, FieldOfCategoryMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialCreateResponseEntitySchema = CharacteristicsMaterialSchema.pick({
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

const CharacteristicsMaterialCreateRequestSchema = CharacteristicsMaterialSchema.pick({
  name: true,
  value: true,
  comment: true,
});

const CharacteristicsMaterialCreateResponseSchema = z
  .object({
    data: CharacteristicsMaterialCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialCreateCommand {
  export const RequestSchema = CharacteristicsMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
