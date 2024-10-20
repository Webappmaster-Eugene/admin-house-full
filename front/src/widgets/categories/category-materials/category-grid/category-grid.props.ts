import {
  CategoryMaterialGetCommand,
  CategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import { TableProps } from 'src/shared/table';

export type CategoryGridProps = {
  table: TableProps;
  dataFiltered: CategoryMaterialGetAllCommand.ResponseEntity;
  onOpenDeletingManyCategoriesPopup: VoidFunction;
  onDeleteCategory: (id: string) => void;
  onOpenChangerCategoryPopup: (
    event: React.MouseEvent<HTMLElement>,
    categoryInfoToChange: CategoryMaterialGetCommand.ResponseEntity
  ) => void;
};
