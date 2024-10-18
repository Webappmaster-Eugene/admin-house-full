import { FieldOfCategoryMaterialColumnSchema } from '@/utils/tables-schemas/field-category/field-category-columns-schema.enum';

export const FieldOfCategoryMaterialRequiredCreateColumns: string[] = [
  FieldOfCategoryMaterialColumnSchema.name,
  FieldOfCategoryMaterialColumnSchema.isRequired,
  FieldOfCategoryMaterialColumnSchema.fieldType,
  FieldOfCategoryMaterialColumnSchema.unitOfMeasurement,
];
