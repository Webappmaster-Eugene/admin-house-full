import { FieldOfCategoryMaterialColumnEditableFullSchema } from '@/utils/tables-schemas/field-category/field-category-columns-schema.enum';

export const FieldOfCategoryMaterialEditableColumns: string[] = [
  FieldOfCategoryMaterialColumnEditableFullSchema.comment,
  FieldOfCategoryMaterialColumnEditableFullSchema.fieldType,
  FieldOfCategoryMaterialColumnEditableFullSchema.defaultValue,
  FieldOfCategoryMaterialColumnEditableFullSchema.isRequired,
  FieldOfCategoryMaterialColumnEditableFullSchema.unitOfMeasurement,
  FieldOfCategoryMaterialColumnEditableFullSchema.name,
];

export const FieldOfCategoryMaterialEditableCreateColumns: string[] = [
  FieldOfCategoryMaterialColumnEditableFullSchema.comment,
  FieldOfCategoryMaterialColumnEditableFullSchema.fieldType,
  FieldOfCategoryMaterialColumnEditableFullSchema.defaultValue,
  FieldOfCategoryMaterialColumnEditableFullSchema.isRequired,
  FieldOfCategoryMaterialColumnEditableFullSchema.unitOfMeasurement,
  FieldOfCategoryMaterialColumnEditableFullSchema.name,
];
