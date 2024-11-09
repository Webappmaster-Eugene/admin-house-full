import {
  CategoryMaterialGetAllCommand,
  CharacteristicsMaterialGetCommand,
} from '@numart/house-admin-contracts';

import { GridRenderCellParams } from '@mui/x-data-grid';

import { paths } from 'src/utils/routes/paths';

import { GridCellExpandWithIcon } from 'src/shared/mui-data-grid/datagrid-materials-cell-name/components/datagrid-materials-cell-name/datagrid-materials-cell-name-with-icon';

export function renderCellExpandWithIcon(
  params: GridRenderCellParams<any, string>,
  allCategoryMaterialsOfHandbook: CategoryMaterialGetAllCommand.ResponseEntity
) {
  const allNeedFieldsUuidsInCategoryMaterialTemplateName = allCategoryMaterialsOfHandbook
    .find((item) => item.uuid === params.row.categoryMaterialUuid)
    ?.fieldsOfCategoryMaterialsInTemplate?.map((item) => item.uuid);
  const allFieldUuidsInCharacteristicsOfMaterial = params.row.characteristicsMaterial.map(
    (item: CharacteristicsMaterialGetCommand.ResponseEntity) => item.fieldOfCategoryMaterialUuid
  );

  // если в категории задан шаблон, а имя материала ему не удовлетворяет, то нужно отметить его специальной иконкой
  const noAnyCharacteristics =
    params.row.categoryMaterial.templateName && params.row.characteristicsMaterial.length === 0;
  const notHavingAllTemplateCharacteristics =
    !allNeedFieldsUuidsInCategoryMaterialTemplateName?.every((elem) =>
      allFieldUuidsInCharacteristicsOfMaterial?.includes(elem)
    );
  const pathToRedirect = `${paths.dashboard.categoryMaterials}/${params.row.categoryMaterial.uuid}`;
  const isCellNameNeedToMark = noAnyCharacteristics || notHavingAllTemplateCharacteristics;
  return (
    <GridCellExpandWithIcon
      value={params.value || ''}
      width={params.colDef.computedWidth}
      isCellNameNeedToMark={isCellNameNeedToMark}
      pathToRedirect={pathToRedirect}
    />
  );
}
