import { z } from 'zod';
import { EntityUrlParamCommand } from '../common';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialDeleteResponseEntitySchema = CharacteristicsMaterialSchema.pick({
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

const CharacteristicsMaterialDeleteResponseSchema = z
  .object({
    data: CharacteristicsMaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = CharacteristicsMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CharacteristicsMaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
