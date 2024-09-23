import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';

import { DrawerProps } from '@mui/material/Drawer';

export type CategoryDetailsProps = DrawerProps & {
  item: CategoryMaterialGetCommand.ResponseEntity;
  onCopyLink: VoidFunction;
  //
  onClose: VoidFunction;
  onDelete: VoidFunction;
};
