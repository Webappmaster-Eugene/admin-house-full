import { FieldOfCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import { fieldsIdsExtractor } from 'src/utils/helpers/parsers/category-template-name-parser/fields-ids.extractor';
import { categoryTemplateNameParser } from 'src/utils/helpers/parsers/category-template-name-parser/category-template-name.parser';
import { categoryTemplateNameReplacer } from 'src/utils/helpers/parsers/category-template-name-parser/category-template-name.replacer';
import { filterFieldsToTemlateFieldsHandler } from 'src/utils/helpers/parsers/category-template-name-parser/filter-fields-to-temlate-fields.handler';

export function categoryTemplateNameToTagsParser(
  templateName: string | null | undefined,
  allFields: FieldOfCategoryMaterialGetAllCommand.ResponseEntity
) {
  const allPartsOfTemplateNameOfCategory = categoryTemplateNameParser(templateName);
  // DOC 2) получили все id полей, из которых состоит шаблонное имя
  const fieldsIdsInTemplateNameOfCategory = fieldsIdsExtractor(allPartsOfTemplateNameOfCategory);
  // DOC 3) фильтруем все поля категории из стейта, оставляя только те, id которых есть в fieldsIdsInTemplateNameOfCategory
  const fieldsOfCategoryInTemplateNameOfCategory = filterFieldsToTemlateFieldsHandler(
    allFields,
    fieldsIdsInTemplateNameOfCategory
  );
  // DOC 4) обходим в цикле allPartsOfTemplateNameOfCategory и заменяем шаблонное имя ПОЛЯ (не категории) на настоящее имя поля
  const tagsForInput = categoryTemplateNameReplacer(
    allPartsOfTemplateNameOfCategory,
    fieldsOfCategoryInTemplateNameOfCategory
  );
  return tagsForInput;
}
