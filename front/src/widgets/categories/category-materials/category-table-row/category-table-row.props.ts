import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';

export type CategoryTableRowProps = {
  row: CategoryMaterialGetCommand.ResponseEntity;
  selected: boolean;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onOpenDeletingOneCategoryPopup: VoidFunction;
  onOpenChangerPopup: (
    event: React.MouseEvent<HTMLElement>,
    categoryInfoToChange: CategoryMaterialGetCommand.ResponseEntity
  ) => void;
};
