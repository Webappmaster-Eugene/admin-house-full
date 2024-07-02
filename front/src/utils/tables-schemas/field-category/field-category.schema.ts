import { GridColDef } from '@mui/x-data-grid';

export const allFieldCategoryTableColumns: GridColDef[] = [
  { field: 'uuid', headerName: 'id', width: 190 },
  { field: 'firstName', headerName: 'Имя', width: 150 },
  { field: 'secondName', headerName: 'Фамилия', width: 230 },
  { field: 'roleName', headerName: 'Роль', width: 150 },
  { field: 'email', headerName: 'Почта', width: 190 },
  { field: 'phone', headerName: 'Телефон', width: 180 },
];
