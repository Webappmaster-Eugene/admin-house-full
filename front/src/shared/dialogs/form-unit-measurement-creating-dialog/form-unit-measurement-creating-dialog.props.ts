import { ReturnUseBooleanType } from '@/utils/hooks/use-boolean';
import { FieldUnitMeasurementCreateCommand } from '@numart/house-admin-contracts';

export type FormUnitMeasurementCreatingDialogProps = {
  dialog: ReturnUseBooleanType;
  handleClickAddUnitMeasurement: (
    createFieldUnitMeasurementDto: FieldUnitMeasurementCreateCommand.Request
  ) => Promise<FieldUnitMeasurementCreateCommand.ResponseEntity>;
  handleChangeAfterCreating: (newCreatedValue: string) => void;
};
