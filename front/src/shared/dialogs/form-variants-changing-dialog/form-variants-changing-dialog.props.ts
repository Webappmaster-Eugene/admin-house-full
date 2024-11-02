import { ReturnUseBooleanType } from '@/utils/hooks/use-boolean';
import { FieldVariantsForSelectorFieldTypeGetAllCommand } from '@numart/house-admin-contracts';

export type FormVariantsChangingDialogProps = {
  options: FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity;
  dialog: ReturnUseBooleanType;
};
