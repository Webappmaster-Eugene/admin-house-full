export function templateNameMaterialGenerator(fieldOfMaterialId: string) {
  const templateNameMaterialRegex = new RegExp(`{{#[a-z0-9а-яА-ЯёЁ-]{1,}_${fieldOfMaterialId}_[a-zA-Z0-9]{24}}}`, 'gm');
  return templateNameMaterialRegex;
}
