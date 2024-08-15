export function regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(nameFieldOfCategoryMaterial: string) {
  const regex = new RegExp(/[_\s]/gm);
  const updatedName = nameFieldOfCategoryMaterial.toLowerCase().replace(regex, '-');
  return updatedName;
}
