import { z } from 'zod';
import { FieldOfCategoryMaterialSchema, FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialCreateResponseEntitySchema = FieldOfCategoryMaterialSchema.pick({
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

const FieldOfCategoryMaterialCreateRequestSchema = FieldOfCategoryMaterialSchema.pick({
  name: true,
  comment: true,
  uniqueNameForTemplate: true,
  defaultValue: true,
  isRequired: true,
  unitOfMeasurementUuid: true,
  fieldTypeUuid: true,
});

const FieldOfCategoryMaterialCreateResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialCreateCommand {
  export const RequestSchema = FieldOfCategoryMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldOfCategoryMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldOfCategoryMaterialCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
