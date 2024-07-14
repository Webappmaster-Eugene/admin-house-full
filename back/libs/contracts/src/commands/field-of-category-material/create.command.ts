import { z } from 'zod';
import { FieldOfCategoryMaterialSchema, ResponseClientSchema } from '../../models';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../../models/field-of-category-material/field-of-category-material-business-value.schema';
import { FieldOfCategoryMaterialRelatedEntitiesSchema } from '../../models/field-of-category-material/field-of-category-material-related-entities.schema';

const FieldOfCategoryMaterialCreateResponseEntitySchema = FieldOfCategoryMaterialBusinessValueSchema.merge(
  FieldOfCategoryMaterialRelatedEntitiesSchema,
);

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
