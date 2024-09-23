// DOC 4) обходим в цикле allPartsOfTemplateNameOfCategory и заменяем шаблонное имя ПОЛЯ (не категории) на настоящее имя поля
import { FieldOfCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

export function categoryTemplateNameReplacer(
  allPartsOfTemplateNameOfCategory: string[],
  fieldsOfCategoryInTemplateNameOfCategory: FieldOfCategoryMaterialGetAllCommand.ResponseEntity
) {
  const tagsForInput =
    allPartsOfTemplateNameOfCategory &&
    allPartsOfTemplateNameOfCategory?.map((partOfTemplateName) => {
      const isTemplateEntity = partOfTemplateName?.match(/{{(.*?)}}/gm);
      // DOC 4.1 находим данное поле среди fieldsInTemplateName
      // DOC 4.2 возвращаем вместо шаблонного имени ПОЛЯ настоящее имя поля
      if (isTemplateEntity) {
        // DOC 4.2 опять вытаскиваем id поля из шаблонного имени поля
        const currentFieldIdDirty = partOfTemplateName?.match(/_.{1,}_/gm);
        const currentFieldId =
          currentFieldIdDirty && currentFieldIdDirty[0]?.split('')?.slice(1, -1)?.join('');

        const field = fieldsOfCategoryInTemplateNameOfCategory?.find(
          (fieldInTemplateName) => fieldInTemplateName.uuid === currentFieldId
        );
        return field?.name || partOfTemplateName;
      }
      // DOC 4.3 если это символы для связи в шаблонном имени (всякие пробелы _ + # * и т.п.), то возвращаем их)
      return partOfTemplateName;
    });
  return tagsForInput;
}
