import { FieldOfCategoryMaterial } from '.prisma/client';
import { regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator } from 'src/common/helpers/regex/regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator';

export function fieldOfCategoryMaterialTemplateReGenerator(nameFieldOfCategoryMaterial: FieldOfCategoryMaterial) {
  const finalString = `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(nameFieldOfCategoryMaterial.name)}_${nameFieldOfCategoryMaterial.uuid}_${nameFieldOfCategoryMaterial.fieldTypeUuid}}}`;
  return finalString;
}
