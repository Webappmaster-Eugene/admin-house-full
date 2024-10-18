import { z } from 'zod';
import { FieldOfCategoryMaterialGetCommand } from '@numart/house-admin-contracts';

export const FieldsOfCategoryMaterialTableEntity =
  FieldOfCategoryMaterialGetCommand.ResponseEntitySchema.pick({
    uuid: true,
    name: true,
    numInOrder: true,
    comment: true,
    isRequired: true,
    unitOfMeasurementUuid: true,
    unitOfMeasurement: true,
    defaultValue: true,
    uniqueNameForTemplate: true,
    categoriesMaterial: true,
    fieldType: true,
    fieldTypeUuid: true,
    fieldVariantsForSelectorFieldType: true,
    categoriesMaterialsTemplatesIncludesThisField: true,
  }).merge(
    z.object({
      isNew: z.boolean(),
    })
  );

export type TFieldsOfCategoryMaterialTableEntity = z.infer<
  typeof FieldsOfCategoryMaterialTableEntity
>;
