import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  GlobalCategoryMaterialGetCommand,
  GlobalCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface RHFAutocompleteGlobalCategory {
  type: 'global-category';
  name: string;
  options: GlobalCategoryMaterialGetAllCommand.ResponseEntity;
  defValue?: GlobalCategoryMaterialGetCommand.ResponseEntity;
  disabled?: boolean;
}

export const RHFGlobalCategoriesAutocomplete: React.FC<RHFAutocompleteGlobalCategory> = ({
  type,
  name,
  options,
  defValue,
  disabled = false,
}) => {
  const { control, setValue } = useFormContext();
  let label: string = 'Глобальная категория';
  let placeholder: string = 'Отсутствует';

  if (type === 'global-category') {
    label = 'Глобальная категория';
    placeholder = defValue ? 'Выбор глобальной категории' : '';
  } else {
    label = 'Поля';
    placeholder = defValue ? 'Выбор' : '';
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defValue}
      shouldUnregister
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          disabled={disabled}
          getOptionLabel={(option: GlobalCategoryMaterialGetCommand.ResponseEntity) =>
            option?.nameRu || 'Материалы'
          }
          fullWidth
          id={`autocomplete-${name}`}
          value={value}
          options={options}
          renderOption={(props, option: GlobalCategoryMaterialGetCommand.ResponseEntity) => (
            <li {...props} key={option.uuid}>
              {option.nameRu}
            </li>
          )}
          isOptionEqualToValue={(
            option: GlobalCategoryMaterialGetCommand.ResponseEntity,
            valueToInput: GlobalCategoryMaterialGetCommand.ResponseEntity
          ) => option.uuid === valueToInput.uuid}
          onChange={(event, newValue) => {
            setValue(name, newValue);
            onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder={placeholder} />
          )}
        />
      )}
    />
  );
};
