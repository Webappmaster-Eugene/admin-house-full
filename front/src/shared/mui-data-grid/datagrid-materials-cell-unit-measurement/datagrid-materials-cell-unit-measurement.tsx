import { memo, useState, useEffect } from 'react';
import { FieldUnitMeasurementGetCommand } from '@numart/house-admin-contracts';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useGridApiContext } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useBoolean } from 'src/utils/hooks/use-boolean';

import DialogDeleteEntity from 'src/shared/dialogs/dialog-delete-entity/dialog-delete-entity';
import FormUnitMeasurementCreatingDialog from 'src/shared/dialogs/form-unit-measurement-creating-dialog/form-unit-measurement-creating-dialog';
import { DataGridCellUnitMeasurementProps } from 'src/shared/mui-data-grid/datagrid-materials-cell-unit-measurement/datagrid-materials-cell-unit-measurement.props';

export const DataGridCellUnitMeasurement = memo((props: DataGridCellUnitMeasurementProps) => {
  const {
    id,
    field,
    optionsForSelect,
    handleClickDeleteUnitMeasurement,
    defaultValue,
    handleClickAddNewUnitMeasurement,
  } = props;
  const [value, setValue] = useState<string>(defaultValue || '');
  const apiRef = useGridApiContext();
  const isCreatingNewUnitMeasurementDialogOpen = useBoolean();
  const isDeleteEntityDialogOpen = useBoolean();
  const [isOpen, setIsOpen] = useState<boolean>(false); //
  const [valueToDelete, setValueToDelete] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value !== 'addNewUnitMeasurementForHandbookInCurrentWorkspace') {
      const newValue = event.target.value; // The new value entered by the user
      setValue(newValue);
      apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 200 });
    } else {
      setValue((prevValue) => prevValue);
    }
  };

  const handleChangeAfterCreating = (newCreatedValue: string) => {
    setValue(newCreatedValue);
    apiRef.current.setEditCellValue({ id, field, value: newCreatedValue });
  };

  const handleDeleteOptionClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    option: FieldUnitMeasurementGetCommand.ResponseEntity
  ) => {
    setValueToDelete(option.uuid);
    setIsOpen(false);
    isDeleteEntityDialogOpen.onTrue();
    // event.preventDefault();
    event.stopPropagation();
  };

  const handleClickButtonToAddNewUnitMeasurement = () => {
    isCreatingNewUnitMeasurementDialogOpen.onTrue();
  };

  const handleDeleteClick = () => {
    handleClickDeleteUnitMeasurement(valueToDelete);
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  return (
    <>
      <TextField onChange={handleChange} value={value} select sx={{ width: '100%' }}>
        {optionsForSelect
          .map((option: FieldUnitMeasurementGetCommand.ResponseEntity, index) => (
            <MenuItem
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '8px',
                padding: '5px',
              }}
              key={option?.uuid || index}
              value={option.name}
              onFocus={() => setIsOpen(true)} // Устанавливаем isOpen в true при фокусе
            >
              {option.name}
              <Button
                onClick={(event) => handleDeleteOptionClick(event, option)}
                sx={{
                  minWidth: '21px',
                  padding: '2px',
                }}
              >
                {!option.isDefault && value !== option.name && (
                  <DeleteForeverIcon
                    sx={{
                      maxWidth: '21px',
                      color: 'red',
                      transition: 'transform 0.4s',
                      '&:hover': {
                        transform: isOpen ? 'scale(1.15)' : 'none', // Увеличение размера кнопки
                      },
                    }}
                  />
                )}
              </Button>
            </MenuItem>
          ))
          .concat(
            <MenuItem
              sx={{ width: '100%' }}
              key="addNewUnitMeasurementForHandbookInCurrentWorkspace"
              value="addNewUnitMeasurementForHandbookInCurrentWorkspace"
              onClick={handleClickButtonToAddNewUnitMeasurement}
            >
              <AddIcon sx={{ maxWidth: '16px', marginRight: '4px' }} />
              <Typography sx={{ fontSize: '14px' }}>Добавить</Typography>
            </MenuItem>
          )}
      </TextField>

      <FormUnitMeasurementCreatingDialog
        handleClickAddUnitMeasurement={handleClickAddNewUnitMeasurement}
        dialog={isCreatingNewUnitMeasurementDialogOpen}
        handleChangeAfterCreating={handleChangeAfterCreating}
      />

      <DialogDeleteEntity onDelete={handleDeleteClick} dialog={isDeleteEntityDialogOpen} />
    </>
  );
});
