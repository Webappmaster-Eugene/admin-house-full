import { memo, useState, useEffect } from 'react';
import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';

import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useGridApiContext } from '@mui/x-data-grid';

import { useBoolean } from 'src/utils/hooks/use-boolean';

import { DataGridCellCategoryProps } from 'src/shared/mui-data-grid/datagrid-materials-cell-category/datagrid-materials-cell-category.props';

export const DataGridCellCategory = memo((props: DataGridCellCategoryProps) => {
  const { id, field, isSelect, optionsForSelect, defaultValue, handleClickAddNewCategory } = props;
  const [value, setValue] = useState(defaultValue || '');
  const apiRef = useGridApiContext();
  const isChangingFieldVariantsForFieldOfCategoryDialogOpen = useBoolean();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (
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

  return (
    <>
      {isSelect ? (
        <TextField onChange={handleChange} value={value} select sx={{ width: '100%' }}>
          {optionsForSelect.map((option: CategoryMaterialGetCommand.ResponseEntity, index) => (
            <MenuItem sx={{ width: '100%' }} key={option?.uuid || index} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
          .concat(
          <MenuItem
            sx={{ width: '100%' }}
            key="addNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials"
            value="addNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials"
            onClick={handleClickAddNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials}
          >
            <AddIcon sx={{ maxWidth: '16px', marginRight: '4px' }} />
            <Typography sx={{ fontSize: '14px' }}>Добавить</Typography>
          </MenuItem>
          )
        </TextField>
      ) : (
        <TextField onChange={handleChange} value={value} type="text" />
      )}
      {/* <FormVariantsChangingDialog */}
      {/*  options={allFieldVariantsOfHandbook} */}
      {/*  optionsForSelect={optionsForSelect} */}
      {/*  fieldCategoryId={fieldCategoryId} */}
      {/*  handleClickAddNewFieldVariants={handleClickAddNewFieldVariants} */}
      {/*  dialog={isChangingFieldVariantsForFieldOfCategoryDialogOpen} */}
      {/* /> */}
    </>
  );
});
