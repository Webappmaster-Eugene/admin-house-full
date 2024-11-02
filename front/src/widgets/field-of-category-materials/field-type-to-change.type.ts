import {
  FieldTypeGetAllCommand,
  FieldOfCategoryMaterialGetCommand,
} from '@numart/house-admin-contracts';

import { GridValidRowModel, GridCellEditStopParams } from '@mui/x-data-grid';

export type FieldTypeToChange = {
  idOfFieldOfCategoryRow: string;
  oldFieldOfCategory: FieldOfCategoryMaterialGetCommand.ResponseEntity | undefined;
  updatedFieldOfCategory: GridValidRowModel;
  oldFieldTypeName: string | undefined;
  newFieldTypeName: string;
  params: GridCellEditStopParams;
  workspaceFullInfo: {
    allFieldTypes: FieldTypeGetAllCommand.ResponseEntity;
    workspaceId: string;
    handbookId: string;
  };
};
