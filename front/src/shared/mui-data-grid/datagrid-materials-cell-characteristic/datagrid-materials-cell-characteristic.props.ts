import {
  FieldVariantsForSelectorFieldTypeCreateCommand,
  FieldVariantsForSelectorFieldTypeGetAllCommand,
} from '@numart/house-admin-contracts';

import { GridRowId } from '@mui/x-data-grid';

export interface DataGridCellCharacteristicProps {
  defaultValue?: string;
  isSelect: boolean;
  isOnlyDigits: boolean;
  optionsForSelect?: FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity | undefined;
  id: GridRowId;
  field: string;
  fieldCategoryId: string;
  allFieldVariantsOfHandbook: FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity;
  handleClickAddNewFieldVariants: (
    fieldOfCategoryMaterialId: string,
    fieldVariantForSelectorFieldTypeId?: string,
    createFieldVariantOfCategoryDto?: FieldVariantsForSelectorFieldTypeCreateCommand.Request,
    typeAction?: 'add' | 'delete'
  ) => void;
}
