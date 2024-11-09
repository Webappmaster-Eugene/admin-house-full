import { memo, useState, useEffect } from 'react';
import { FieldVariantsForSelectorFieldTypeGetCommand } from '@numart/house-admin-contracts';

import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useGridApiContext } from '@mui/x-data-grid';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useBoolean } from 'src/utils/hooks/use-boolean';

import DialogClearValue from 'src/shared/dialogs/dialog-clear-value/dialog-clear-value';
import FormVariantsChangingDialog from 'src/shared/dialogs/form-variants-changing-dialog/form-variants-changing-dialog';
import { DataGridCellCharacteristicProps } from 'src/shared/mui-data-grid/datagrid-materials-cell-characteristic/datagrid-materials-cell-characteristic.props';

export const DataGridCellCharacteristic = memo((props: DataGridCellCharacteristicProps) => {
  const {
    id,
    field,
    isSelect,
    isOnlyDigits,
    optionsForSelect,
    allFieldVariantsOfHandbook,
    defaultValue,
    fieldCategoryId,
    handleClickAddNewFieldVariants,
  } = props;
  const [value, setValue] = useState(defaultValue || '');
  const apiRef = useGridApiContext();
  const isChangingFieldVariantsForFieldOfCategoryDialogOpen = useBoolean();
  const isClearSelectDialogOpen = useBoolean();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (
      event.target.value !== 'clearFromAllVariantsAndSetDefaultValue' &&
      event.target.value !== 'addNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials'
    ) {
      const newValue = event.target.value; // The new value entered by the user
      apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 200 });
      setValue(newValue);
    } else {
      setValue((prevValue) => prevValue);
    }
  };

  const handleClear = () => {
    const newValue = ''; // The new value entered by the user
    apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 200 });
    setValue(newValue);
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  const handleClickAddNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials = () => {
    isChangingFieldVariantsForFieldOfCategoryDialogOpen.onTrue();
  };

  const handleClickClearFromAllVarinatsAndSetDefaultValue = () => {
    isClearSelectDialogOpen.onTrue();
  };

  return (
    <>
      {isSelect ? (
        <TextField onChange={handleChange} value={value} select sx={{ width: '100%' }}>
          {optionsForSelect
            ?.map((option: FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity, index) => (
              <MenuItem sx={{ width: '100%' }} key={option?.uuid || index} value={option?.value}>
                {option?.value}
              </MenuItem>
            ))
            .concat(
              <MenuItem
                sx={{ width: '100%' }}
                key="addNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials"
                value="addNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials"
                onClick={
                  handleClickAddNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials
                }
              >
                <AddIcon sx={{ maxWidth: '16px', marginRight: '4px' }} />
                <Typography sx={{ fontSize: '14px' }}>Добавить</Typography>
              </MenuItem>
            )
            .concat(
              <MenuItem
                disabled={value.length === 0}
                sx={{ width: '100%' }}
                key="clearFromAllVariantsAndSetDefaultValue"
                value="clearFromAllVariantsAndSetDefaultValue"
                onClick={handleClickClearFromAllVarinatsAndSetDefaultValue}
              >
                <RemoveCircleOutlineIcon sx={{ maxWidth: '16px', marginRight: '4px' }} />
                <Typography sx={{ fontSize: '14px' }}>Очистить</Typography>
              </MenuItem>
            )}
        </TextField>
      ) : (
        <TextField onChange={handleChange} value={value} type={isOnlyDigits ? 'number' : 'text'} />
      )}
      <FormVariantsChangingDialog
        options={allFieldVariantsOfHandbook}
        optionsForSelect={optionsForSelect}
        fieldCategoryId={fieldCategoryId}
        handleClickAddNewFieldVariants={handleClickAddNewFieldVariants}
        dialog={isChangingFieldVariantsForFieldOfCategoryDialogOpen}
      />
      <DialogClearValue onClear={handleClear} dialog={isClearSelectDialogOpen} />
    </>
  );
});
