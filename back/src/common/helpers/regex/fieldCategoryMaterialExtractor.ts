export function fieldCategoryMaterialExtractor(fieldOfCategoryMaterialId: string) {
  const resultRegExp = new RegExp(`{{#([a-z0-9а-яА-ЯёЁ-]{1,})_(${fieldOfCategoryMaterialId})_([a-zA-Z0-9-]{36})}}`, 'gm');
  return resultRegExp;
}
