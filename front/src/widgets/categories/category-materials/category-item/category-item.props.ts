import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';

import { CardProps } from '@mui/material/Card';

export interface CategoryItemProps extends CardProps {
  category: CategoryMaterialGetCommand.ResponseEntity;
  selected?: boolean;
  onSelect?: VoidFunction;
  onDelete: VoidFunction;
  // isDeletingPopupOpened: boolean;
  // onCloseDeletingOneCategoryPopup: VoidFunction;
  // onOpenDeletingOneCategoryPopup: VoidFunction;
  onOpenChangerPopup: (
    event: React.MouseEvent<HTMLElement>,
    categoryInfoToChange: CategoryMaterialGetCommand.ResponseEntity
  ) => void;
}
