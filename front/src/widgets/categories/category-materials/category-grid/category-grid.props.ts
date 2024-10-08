import {
  CategoryMaterialGetCommand,
  CategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import { TableProps } from 'src/shared/table';

export type CategoryGridProps = {
  table: TableProps;
  dataFiltered: CategoryMaterialGetAllCommand.ResponseEntity;
  onOpenConfirm: VoidFunction;
  onDeleteItem: (id: string) => void;
  onOpenChangerPopup: (
    event: React.MouseEvent<HTMLElement>,
    categoryInfoToChange: CategoryMaterialGetCommand.ResponseEntity
  ) => void;
};
