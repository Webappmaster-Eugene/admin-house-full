import { GridRenderCellParams } from '@mui/x-data-grid';

import { GridCellExpandText } from 'src/shared/mui-data-grid/datagrid-materials-cell-name/components/datagrid-materials-cell-name/datagrid-materials-cell-name';

export function renderCellExpand(params: GridRenderCellParams<any, string>) {
  return <GridCellExpandText value={params.value || ''} width={params.colDef.computedWidth} />;
}
