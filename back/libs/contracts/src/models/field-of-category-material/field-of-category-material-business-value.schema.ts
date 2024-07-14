import { FieldOfCategoryMaterialSchema } from '../field-of-category-material';

export const FieldOfCategoryMaterialBusinessValueSchema = FieldOfCategoryMaterialSchema.pick({
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
