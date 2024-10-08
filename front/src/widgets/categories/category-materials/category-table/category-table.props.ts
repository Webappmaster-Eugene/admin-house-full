import {
  CategoryMaterialGetCommand,
  CategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import { TableProps } from 'src/shared/table';

export type CategoryTableProps = {
  table: TableProps;
  notFound: boolean;
  dataFiltered: CategoryMaterialGetAllCommand.ResponseEntity;
  onOpenConfirm: VoidFunction;
  onOpenChangerPopup: (
    event: React.MouseEvent<HTMLElement>,
    categoryInfoToChange: CategoryMaterialGetCommand.ResponseEntity
  ) => void;
  onDeleteRow: (id: string) => void;
};
