import { CategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import { TableProps } from 'src/shared/table';

export type CategoryTableProps = {
  table: TableProps;
  notFound: boolean;
  dataFiltered: CategoryMaterialGetAllCommand.ResponseEntity;
  onOpenConfirm: VoidFunction;
  onDeleteRow: (id: string) => void;
};
