import { z } from 'zod';
import { FieldOfCategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialGetResponseEntitySchema = FieldOfCategoryMaterialSchema.pick({
  name: true,
  comment: true,
  uniqueNameForTemplate: true,
  defaultValue: true,
  isRequired: true,
  unitOfMeasurementUuid: true,
  fieldTypeUuid: true,
  categoryMaterialUuid: true,
  lastChangeByUserUuid: true,
  handbookUuid: true,
  uuid: true,
});

const FieldOfCategoryMaterialGetResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialGetCommand {
  export const ResponseSchema = FieldOfCategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldOfCategoryMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
