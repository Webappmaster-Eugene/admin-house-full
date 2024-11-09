import { useState, useEffect, MouseEvent } from 'react';
import { FieldVariantsForSelectorFieldTypeGetCommand } from '@numart/house-admin-contracts';
import { FormVariantsChangingDialogProps } from '@/shared/dialogs/form-variants-changing-dialog/form-variants-changing-dialog.props';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { EntityActivityStatus } from 'src/utils/const/entity-activity-status.enum';

import CheckboxFreeAutocomplete from 'src/shared/autocomplete-checkboxes-freesolo/checkbox-free-autocomplete';

export default function FormVariantsChangingDialog({
  options,
  dialog,
  optionsForSelect,
  fieldCategoryId,
  handleClickAddNewFieldVariants,
}: FormVariantsChangingDialogProps) {
  const [valueChecks, setValueChecks] = useState<
    (FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity | string)[]
  >(optionsForSelect || []);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (optionsForSelect) {
      setValueChecks(optionsForSelect);
    }
  }, [optionsForSelect]);

  // @ts-ignore
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault(); // Отменяем действие по умолчанию (закрытие диалога)
    }
  };

  const handleConfirmClick = () => {
    valueChecks.forEach((value) => {
      if (typeof value === 'string') {
        handleClickAddNewFieldVariants(fieldCategoryId, undefined, {
          value,
          fieldVariantsForSelectorFieldTypeStatus: EntityActivityStatus.ACTIVE,
        });
      } else if (!value.fieldOfCategoryMaterialUuid) {
        handleClickAddNewFieldVariants(fieldCategoryId, value.uuid, undefined, 'delete');
      }
    });
    dialog.onFalse();
  };

  const handleCancelClick = (event: MouseEvent<HTMLDivElement>, reason: string) => {
    if (reason && reason === 'backdropClick') return;
    setValueChecks([]);
    setInputValue('');
    dialog.onFalse();
  };

  const handleCancelButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setValueChecks([]);
    setInputValue('');
    dialog.onFalse();
  };

  return (
    <Dialog
      open={dialog.value}
      onClose={(event: MouseEvent<HTMLDivElement>, reason: string) =>
        handleCancelClick(event, reason)
      }
      disableEscapeKeyDown
      disableEnforceFocus
    >
      <DialogTitle>Варианты заполнения поля категории</DialogTitle>

      <DialogContent onKeyDown={handleKeyDown}>
        <Typography sx={{ mb: 3 }}>Выберите доступные опции для заполнения </Typography>
        {valueChecks && (
          <CheckboxFreeAutocomplete
            options={options}
            defaultCheckedOptionsFieldVariants={optionsForSelect}
            valueChecks={valueChecks}
            setValueChecks={setValueChecks}
            inputValue={inputValue}
            setInputValue={setInputValue}
            fieldCategoryId={fieldCategoryId}
            name="CheckboxFreeAutocomplete"
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancelButtonClick} variant="outlined" color="inherit">
          Отменить
        </Button>
        <Button onClick={handleConfirmClick} variant="contained">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
