// DOC 2) получили все id полей, из которых состоит шаблонное имя
export function fieldsIdsExtractor(allPartsOfTemplateName: string[]): string[] {
  const fieldsIdsInTemplateNameOfCategory: string[] = [];
  allPartsOfTemplateName?.forEach((partOfTemplateName) => {
    let currentFieldId: string;
    const fieldId = partOfTemplateName.match(/_.{1,}_/gm);
    if (fieldId) {
      currentFieldId = fieldId[0]?.split('')?.slice(1, -1)?.join('');
      fieldsIdsInTemplateNameOfCategory.push(currentFieldId);
    }
  });
  return fieldsIdsInTemplateNameOfCategory;
}
