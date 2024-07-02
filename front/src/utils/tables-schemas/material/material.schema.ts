import { GridColDef } from '@mui/x-data-grid';

export const allMaterialsTableColumns: GridColDef[] = [
  { field: 'uuid', headerName: 'id', width: 190 },
  { field: 'name', headerName: 'Название', width: 150 },
  { field: 'price', headerName: 'Цена', width: 230 },
  { field: 'namePublic', headerName: 'Сокращенное наименование', width: 150 },
  { field: 'sourceInfo', headerName: 'Источник обновления цены', width: 190 },
  { field: 'responsiblePartnerUuid', headerName: 'Поставщик', width: 180 },
  { field: 'categoryMaterialUuid', headerName: 'Категория', width: 180 },
  { field: 'unitMeasurementUuid', headerName: 'Единица измерения', width: 180 },
];
