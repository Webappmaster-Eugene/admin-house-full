import { templateNameMaterialGenerator } from '../regex/regexNameMaterialGenerator';

export function templateNameOfCategoryReplacer(
  templateNameCategoryMaterial: string,
  mapAllFields: string[],
  mapAllCharacteristicsOfConcreteMaterial: Record<string, string>,
) {
  // {{#подтип-метиза_43b6cdf4-91e3-4570-aba3-8e1f2e1f9d96_8cc7f3a3-198a-45f4-a3ee-093c40b1c0da}} {{#диаметр-метиза_aae5b1ff-f421-46e9-981e-16a8b7c7f573_8cc7f3a3-198a-45f4-a3ee-093c40b1c0da}}×{{#$длина-метиза_7a25dd93-f64a-44b6-a88c-f8756c773dae_8cc7f3a3-198a-45f4-a3ee-093c40b1c0da}}
  mapAllFields.forEach(fieldCategoryMaterialUuid => {
    if (fieldCategoryMaterialUuid in mapAllCharacteristicsOfConcreteMaterial) {
      templateNameCategoryMaterial = templateNameCategoryMaterial.replace(
        templateNameMaterialGenerator(fieldCategoryMaterialUuid),
        mapAllCharacteristicsOfConcreteMaterial[fieldCategoryMaterialUuid],
      );
    }
  });

  return templateNameCategoryMaterial;
}
