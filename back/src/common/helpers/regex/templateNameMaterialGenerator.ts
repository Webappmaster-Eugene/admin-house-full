// export async function templateNameMaterialGenerator(
//   categoryMaterial: {
//     uuid: string;
//     name: string;
//     comment?: string;
//     templateName?: string;
//     globalCategoryMaterialUuid: string;
//     createdAt: Date;
//     updatedAt: Date;
//   },
//   material: {
//     uuid: string;
//     name: string;
//     comment?: string;
//     namePublic?: string;
//     sourceInfo?: string;
//     handbookUuid: string;
//     price: number;
//     unitMeasurementUuid: string;
//     categoryUuid: string;
//     responsiblePartnerUuid: string;
//     createdAt: Date;
//     updatedAt: Date;
//   },
// ) {
//   const allFieldsOfConcreteMaterial = await prisma?.fieldOfCategoryMaterial?.findMany({
//     where: {
//       categoryMaterialUuid: categoryMaterial.uuid,
//     },
//   });
//
//   const allCharacteristicsOfConcreteMaterial = await prisma?.characteristicsMaterial?.findMany({
//     where: {
//       materialUuid: material.uuid,
//     },
//   });
//
//   const mapAllFieldsOfMaterialUuidsWith;
//
//   // `${FIELD_OF_CATEGORY_MATERIALS[2].templateName} ${FIELD_OF_CATEGORY_MATERIALS[0].templateName}×${FIELD_OF_CATEGORY_MATERIALS[1].templateName}`,
//   // `{{#диаметр-метиза_${CATEGORY_MATERIALS[3].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}` `{{#диаметр-метиза_${CATEGORY_MATERIALS[3].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`×`{{#диаметр-метиза_${CATEGORY_MATERIALS[3].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`
//   const templateNameOfCategory = categoryMaterial.templateName;
//
//   const realTemplateNameOfMaterial = ' ';
//   return realTemplateNameOfMaterial;
// }
