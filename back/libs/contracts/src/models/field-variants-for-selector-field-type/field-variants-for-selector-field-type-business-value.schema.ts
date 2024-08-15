import { FieldVariantsForSelectorFieldTypeSchema } from './field-variants-for-selector-field-type.schema';

export const FieldVariantsForSelectorFieldTypeBusinessValueSchema = FieldVariantsForSelectorFieldTypeSchema.pick({
  description: true,
  value: true,
  handbookUuid: true,
  uuid: true,
  fieldOfCategoryMaterialUuid: true,
  fieldVariantsForSelectorFieldTypeStatus: true,
  numInOrder: true,
  lastChangeByUserUuid: true,
});
