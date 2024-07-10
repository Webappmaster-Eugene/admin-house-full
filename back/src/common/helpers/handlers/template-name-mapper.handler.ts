import { CategoryMaterialGetCommand, MaterialGetCommand } from 'libs/contracts';
import { PrismaClient } from '.prisma/client';
import { templateNameOfCategoryReplacer } from './template-name-replacer.handler';

export async function templateNameMapper(
  categoryMaterial: CategoryMaterialGetCommand.ResponseEntity,
  material: MaterialGetCommand.ResponseEntity,
  prisma: PrismaClient,
) {
  const allFieldsOfConcreteMaterial = await prisma?.fieldOfCategoryMaterial?.findMany({
    where: {
      categoryMaterialUuid: categoryMaterial.uuid,
    },
  });

  const allCharacteristicsOfConcreteMaterial = await prisma?.characteristicsMaterial?.findMany({
    where: {
      materialUuid: material.uuid,
    },
  });

  const mapAllCharacteristicsOfConcreteMaterial = allCharacteristicsOfConcreteMaterial.reduce((acc, curValue) => {
    acc[curValue.fieldOfCategoryMaterialUuid] = curValue.value;
    return acc;
  }, {});
  //DOC - в acc находится: {"uuid филда категории":"6","uuid филда категории":"30","uuid филда категории":"Саморез"}
  //mapAllCharacteristicsOfConcreteMaterial это мапа вида - [id филда категории]: значение характеристики для него'

  // DOC allFieldsOfMaterialUuids - это все uuid филдов категории, к которой принадлежит материал;
  const allFieldsOfMaterialUuids = allFieldsOfConcreteMaterial.map(elem => {
    return elem.uuid;
  });

  //DOC templateNameCategoryMaterial - шаблон для наименования материала в категории
  // `{{#подтип-метиза_0a23cdfdsfsdff45f45f45f4_0a23cdfdsfsdff45f45f45f4}}}` `{{длина-метиза_0a23cdfdsfsdff45f45f45f4_0a23cdfdsfsdff45f45f45f4}}`×`{{#диаметр-метиза_0a23cdfdsfsdff45f45f45f4_0a23cdfdsfsdff45f45f45f4}}`
  const templateNameCategoryMaterial = categoryMaterial.templateName;

  return templateNameOfCategoryReplacer(templateNameCategoryMaterial, allFieldsOfMaterialUuids, mapAllCharacteristicsOfConcreteMaterial);
}
