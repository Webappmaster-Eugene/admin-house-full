import { regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator } from './regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator';
import { FieldOfCategoryMaterial } from '.prisma/client';

export function fieldOfCategoryMaterialTemplateGenerator(nameFieldOfCategoryMaterial: FieldOfCategoryMaterial) {
  const finalString = `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(nameFieldOfCategoryMaterial.name)}_${nameFieldOfCategoryMaterial.uuid}_${nameFieldOfCategoryMaterial.fieldTypeUuid}}}`;
  return finalString;
}
