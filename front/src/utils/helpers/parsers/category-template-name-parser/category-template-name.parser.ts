// DOC 1 получили все части шаблонного имени в виде массива
// DOC ['{{#подтип-метиза_b8326b17-ecbb-4816-9f87-2e6a0064d86d_2561475f-9a96-4c6a-892d-a2636ee88231}}', ' ', '{{#диаметр_6329798b-7458-47e3-bcc6-d86b8db22baa_7c6c9351-5ea6-4eb1-8f30-f1e4e0763298}}', '×']
export function categoryTemplateNameParser(templateName: string | undefined | null): Array<string> {
  const separator = /{{([^{}]*)}}|([^{}]+)/g;
  const allPartsOfTemplateNameOfCategory = templateName?.match(separator);
  return allPartsOfTemplateNameOfCategory || [];
}
