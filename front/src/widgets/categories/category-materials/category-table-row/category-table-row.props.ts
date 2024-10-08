import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';

export type CategoryTableRowProps = {
  row: CategoryMaterialGetCommand.ResponseEntity;
  selected: boolean;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onOpenChangerPopup: (
    event: React.MouseEvent<HTMLElement>,
    categoryInfoToChange: CategoryMaterialGetCommand.ResponseEntity
  ) => void;
};
