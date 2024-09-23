import { FieldOfCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

export function filterFieldsToTemlateFieldsHandler(
  allFields: FieldOfCategoryMaterialGetAllCommand.ResponseEntity,
  fieldsIdsInTemplateNameOfCategory: string[]
): FieldOfCategoryMaterialGetAllCommand.ResponseEntity {
  // DOC 3) фильтруем все поля категории из стейта, оставляя только те, id которых есть в fieldsIdsInTemplateName
  const fieldsOfCategoryInTemplateNameOfCategory = allFields?.filter((field) =>
    fieldsIdsInTemplateNameOfCategory.includes(field.uuid)
  );
  return fieldsOfCategoryInTemplateNameOfCategory;
}
