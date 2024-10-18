import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FieldOfCategoryMaterialGetCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface RHFAutocompleteFields {
  type: 'required' | 'not-required';
  name: string;
  options: FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
  defValue?: FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
  disabled?: boolean;
  tagsInTemplate?: string[];
}

export const RHFFieldsAutocomplete: React.FC<RHFAutocompleteFields> = ({
  type,
  name,
  options,
  defValue,
  disabled = false,
  tagsInTemplate,
}) => {
  const { control, setValue } = useFormContext();
  let label: string = 'Свойство';
  let placeholder: string = 'Пока пусто';

  if (type === 'required') {
    label = 'Обязательные поля';
    placeholder = defValue?.length === 0 ? 'Выбор обязательных полей' : '';
  } else if (type === 'not-required') {
    label = 'Необязательные поля';
    placeholder = defValue?.length === 0 ? 'Выбор необязательных полей' : '';
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defValue}
      shouldUnregister
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          noOptionsText="Вариантов не найдено"
          disabled={disabled}
          getOptionLabel={(option: FieldOfCategoryMaterialGetCommand.ResponseEntity) =>
            option?.name
          }
          limitTags={3}
          multiple
          fullWidth
          id={`autocomplete-${name}`}
          value={value}
          options={options}
          disableCloseOnSelect
          isOptionEqualToValue={(
            option: FieldOfCategoryMaterialGetCommand.ResponseEntity,
            valueToInput: FieldOfCategoryMaterialGetCommand.ResponseEntity
          ) => option.uuid === valueToInput.uuid}
          onChange={(event, newValue) => {
            setValue(name, newValue);
            onChange(newValue);
          }}
          renderOption={(
            props,
            option: FieldOfCategoryMaterialGetCommand.ResponseEntity,
            { selected }
          ) => (
            <li {...props} key={option.uuid}>
              <Checkbox key={option.uuid} size="small" checked={selected} />
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={!value ? 'Шаблонное имя не задано' : ''}
            />
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                disabled={!!tagsInTemplate?.includes(option.name)}
                key={option.uuid + index}
                label={option.name}
                variant="soft"
                size="small"
              />
            ))
          }
        />
      )}
    />
  );
};
