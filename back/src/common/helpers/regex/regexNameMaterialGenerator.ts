export function templateNameMaterialGenerator(fieldOfCategoryMaterialId: string) {
  // {{#[a-z0-9а-яА-ЯёЁ-]{1,}_[a-zA-Z0-9-]{36}_[a-zA-Z0-9-]{36}}}/gm
  // /{{#([a-z0-9а-яА-ЯёЁ-]{1,})_(c2d4bcae-0c26-41aa-8c07-94dc27adb077)_([a-zA-Z0-9-]{36})}}/gm
  // {{#диаметр-новый_$2_$3}}
  const templateNameMaterialRegex = new RegExp(`{{#[a-z0-9а-яА-ЯёЁ-]{1,}_${fieldOfCategoryMaterialId}_[a-zA-Z0-9-]{36}}}`, 'gm');
  return templateNameMaterialRegex;
}
