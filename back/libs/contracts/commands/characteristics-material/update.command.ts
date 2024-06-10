import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialUpdateResponseEntitySchema = CharacteristicsMaterialSchema.pick({
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

const CharacteristicsMaterialUpdateRequestSchema = CharacteristicsMaterialSchema.pick({
  name: true,
  value: true,
  comment: true,
}).partial();

const CharacteristicsMaterialUpdateResponseSchema = z
  .object({
    data: CharacteristicsMaterialUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialUpdateCommand {
  export const RequestSchema = CharacteristicsMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
