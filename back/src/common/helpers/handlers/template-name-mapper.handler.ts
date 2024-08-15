import { CategoryMaterialGetCommand, MaterialGetCommand } from 'libs/contracts';
import { PrismaClient } from '.prisma/client';
import { templateNameOfCategoryReplacer } from './template-name-replacer.handler';

export async function templateNameMapper(prisma: PrismaClient, material: MaterialGetCommand.ResponseEntity) {
  const categoryMaterialUuid = material.categoryMaterialUuid;
  const categoryMaterial = await prisma?.categoryMaterial?.findFirst({
    where: {
      uuid: categoryMaterialUuid,
    },
  });
  //берем все поля категории, участвующие в составлении имени шаблона категории для материала по categoryMaterial
  const allFieldsOfConcreteMaterial = await prisma?.fieldOfCategoryMaterial?.findMany({
    where: {
      categoriesMaterialsTemplatesIncludesThisField: {
        some: {
          uuid: categoryMaterialUuid,
        },
      },
    },
  });

  //берем все характеристики для материала
  const allCharacteristicsOfConcreteMaterial = await prisma?.characteristicsMaterial?.findMany({
    where: {
      materialUuid: material.uuid,
    },
  });

  //DOC - в acc находится: {"uuid филда категории": "6","uuid филда категории": "30","uuid филда категории": "Саморез"}
  //mapAllCharacteristicsOfConcreteMaterial это мапа вида - [id филда категории]: значение характеристики для него'
  const mapAllCharacteristicsOfConcreteMaterial = allCharacteristicsOfConcreteMaterial.reduce((acc, curValue) => {
    acc[curValue.fieldOfCategoryMaterialUuid] = curValue.value;
    return acc;
  }, {});

  // DOC allFieldsOfMaterialUuids - это все uuid филдов категории, к которой принадлежит материал;
  const allFieldsOfMaterialUuids = allFieldsOfConcreteMaterial.map(elem => {
    return elem.uuid;
  });

  // DOC templateNameCategoryMaterial - шаблон для наименования материала в категории
  // {{#подтип-метиза_0a23cdfdsfsdff45f45f45f4_0a23cdfdsfsdff45f45f45f4}}}` `{{длина_0a23cdfdsfsdff45f45f45f4_0a23cdfdsfsdff45f45f45f4}}`×`{{#диаметр_0a23cdfdsfsdff45f45f45f4_0a23cdfdsfsdff45f45f45f4}}
  const templateNameCategoryMaterial = categoryMaterial.templateName;

  return templateNameOfCategoryReplacer(
    templateNameCategoryMaterial,
    allFieldsOfMaterialUuids,
    mapAllCharacteristicsOfConcreteMaterial,
    allFieldsOfConcreteMaterial,
  );
}
