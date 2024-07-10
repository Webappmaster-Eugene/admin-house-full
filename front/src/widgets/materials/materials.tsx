'use client';

import { useSettingsContext } from '@/shared/settings';
import {
  HandbookGetCommand,
  PriceChangingGetAllCommand,
  CharacteristicsMaterialGetAllCommand,
  ResponsiblePartnerProducerGetAllCommand,
} from '@numart/house-admin-contracts';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import { toRubles } from 'src/utils/helpers/intl';

import { MaterialsProps } from 'src/widgets/materials/material.props';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';

export default function Materials({ materialsInfo, responsibleProducers }: MaterialsProps) {
  const settings = useSettingsContext();

  const { workspaceInfo } = useWorkspaceInfoStore();

  const allMaterialsTableColumns: GridColDef[] = [
    { field: 'uuid', headerName: 'id', width: 100 },
    { field: 'name', headerName: 'Название', width: 150 },
    {
      field: 'price',
      valueFormatter: (value) => toRubles(Number(value)),
      headerName: 'Цена',
      width: 130,
    },
    { field: 'namePublic', headerName: 'Сокращенное наименование', width: 170 },
    { field: 'sourceInfo', headerName: 'Источник обновления цены', width: 120 },
    {
      field: 'responsiblePartner',
      type: 'singleSelect',
      valueOptions: (params) => {
        if (workspaceInfo) {
          const handbookInfo =
            workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
          const responsiblePartners =
            handbookInfo.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
          const partnerNames = responsiblePartners && responsiblePartners.map((elem) => elem.name);

          return partnerNames;
        }
        return [params.row.value];
      },
      valueGetter: (value, row) => `${row.responsiblePartner.name}`,
      headerName: 'Поставщик',
      width: 180,
    },
    {
      field: 'categoryMaterial',
      valueGetter: (value, row) => `${row.categoryMaterial.name}`,
      headerName: 'Категория',
      width: 180,
    },
    {
      field: 'unitMeasurement',

      valueGetter: (value, row) => `${row.unitMeasurement.name}`,
      headerName: 'Единица измерения',
      width: 180,
    },
    {
      field: 'priceChanges',
      valueGetter: (value, row) => {
        const prices: PriceChangingGetAllCommand.ResponseEntity = row.priceChanges;
        let finishValue = 'Изменений цены не было';
        if (prices && prices.length > 0) {
          finishValue = '';
          let counter = 1;
          const template = prices.reduce((acc, curValue) => {
            acc += `${counter}) Старая цена: ${curValue.oldPrice}; Новая цена: ${curValue.newPrice}; `;
            if (curValue?.source) {
              acc += `Источник обновления цены: ${curValue.source}; `;
            }
            counter += 1;
            return acc;
          }, finishValue);
        }
        return finishValue;
      },
      headerName: 'Изменения цены',
      width: 180,
    },
    {
      field: 'characteristicsMaterial',
      valueGetter: (value, row) => {
        const {
          characteristicsMaterial,
        }: { characteristicsMaterial: CharacteristicsMaterialGetAllCommand.ResponseEntity } = row;
        let finishValue = 'Характеристики отсутствуют';
        if (characteristicsMaterial && characteristicsMaterial.length > 0) {
          finishValue = '';
          let counter = 1;
          finishValue = characteristicsMaterial.reduce((acc, curValue) => {
            acc += `${counter}) ${curValue.name} = ${curValue.value};
`;
            // if (curValue?.) {
            //   acc += `Источник обновления цены: ${curValue.source}; `;
            // }
            counter += 1;
            return acc;
          }, finishValue);
        }
        return finishValue;
      },
      headerName: 'Характеристики материала',
      width: 180,
    },
    {
      field: 'save',
      valueGetter: (value, row) => `${row.unitMeasurement.name}`,
      headerName: 'Сохранить',
      width: 180,
    },
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Справочник материалов</Typography>
      <div style={{ width: '100%', maxWidth: '100vw' }}>
        <DataGrid
          rows={materialsInfo}
          columns={allMaterialsTableColumns}
          getRowId={(row) => row.uuid}
          autoHeight
          slots={{ toolbar: GridToolbar }}
          getRowHeight={() => 'auto'}
          // loading={loading}
          // checkboxSelection
        />
      </div>
    </Container>
  );
}
