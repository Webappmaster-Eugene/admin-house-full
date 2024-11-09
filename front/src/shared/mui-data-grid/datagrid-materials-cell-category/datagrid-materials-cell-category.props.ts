import {
  CategoryMaterialCreateCommand,
  CategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import { GridRowId } from '@mui/x-data-grid';

export interface DataGridCellCategoryProps {
  defaultValue?: string;
  isSelect: boolean;
  optionsForSelect: CategoryMaterialGetAllCommand.ResponseEntity;
  id: GridRowId;
  field: string;
  handleClickAddNewCategory: (createNewCategoryDto: CategoryMaterialCreateCommand.Request) => void;
}
