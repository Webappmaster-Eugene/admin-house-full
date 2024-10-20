import {
  CategoryMaterialGetCommand,
  CategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import { TableProps } from 'src/shared/table';

export type CategoryTableProps = {
  table: TableProps;
  notFound: boolean;
  dataFiltered: CategoryMaterialGetAllCommand.ResponseEntity;
  onOpenDeletingManyCategoriesPopup: VoidFunction;
  onOpenChangerCategoryPopup: (
    event: React.MouseEvent<HTMLElement>,
    categoryInfoToChange: CategoryMaterialGetCommand.ResponseEntity
  ) => void;
  onDeleteCategory: (id: string) => void;
};
