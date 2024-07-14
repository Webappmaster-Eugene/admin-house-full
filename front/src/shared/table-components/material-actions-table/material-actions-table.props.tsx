import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';

export type MaterialActionsTableProps = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: string | null;
  setRowId: (rowId: string | null) => void;
};
