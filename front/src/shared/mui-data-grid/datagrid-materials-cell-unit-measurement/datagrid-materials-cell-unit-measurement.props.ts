import {
  FieldUnitMeasurementCreateCommand,
  FieldUnitMeasurementDeleteCommand,
  FieldUnitMeasurementGetAllCommand,
} from '@numart/house-admin-contracts';

import { GridRowId } from '@mui/x-data-grid';

export interface DataGridCellUnitMeasurementProps {
  defaultValue?: string;
  optionsForSelect: FieldUnitMeasurementGetAllCommand.ResponseEntity;
  id: GridRowId;
  field: string;
  handleClickAddNewUnitMeasurement: (
    createNewUnitMeasurementDto: FieldUnitMeasurementCreateCommand.Request
  ) => Promise<FieldUnitMeasurementCreateCommand.ResponseEntity>;
  handleClickDeleteUnitMeasurement: (
    fieldUnitMeasurementId: string
  ) => Promise<FieldUnitMeasurementDeleteCommand.ResponseEntity>;
}
