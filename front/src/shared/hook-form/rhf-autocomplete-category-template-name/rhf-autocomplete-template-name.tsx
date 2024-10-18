import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import RHFAutocompleteTemplateNameProps from 'src/shared/hook-form/rhf-autocomplete-category-template-name/rhf-autocomplete-template-name.props';

const RHFAutocompleteTemplateName: React.FC<RHFAutocompleteTemplateNameProps> = ({
  name,
  options,
  defValue,
  disabled = false,
  nameForRequiredFields,
}) => {
  const { control, setValue, getValues } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defValue}
      shouldUnregister
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          noOptionsText="Вариантов не найдено"
          // forcePopupIcon
          // autoSelect
          // selectOnFocus
          // clearOnBlur
          // handleHomeEndKeys
          disabled={disabled}
          limitTags={3}
          multiple
          onKeyDown={(
            event: React.KeyboardEvent<HTMLDivElement> & {
              defaultMuiPrevented?: boolean | undefined;
            }
          ) => {
            if (event.key === 'Enter' && 'value' in event.target && event.target?.value) {
              setValue(name, value.concat(event.target?.value));
              // setValue(nameForRequiredFields, value.concat(event.target?.value));
            }
          }}
          // groupBy={(option) => option}
          getOptionDisabled={(option) => {
            if (value.some((text: string) => text === option)) {
              return true;
            }
            return false;
          }}
          isOptionEqualToValue={(option, valueToInput) => {
            const isEqual = option === valueToInput;
            return isEqual;
          }}
          freeSolo
          options={options}
          getOptionLabel={(option) => option}
          value={value}
          onChange={(event, newValue) => {
            setValue(name, value);
            onChange(newValue);
            const valuesOfForm = getValues();
            console.log('valuesOfForm', valuesOfForm);
          }}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue);
          }}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                size="small"
                variant="soft"
                label={option}
                key={index}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Шаблонное имя"
              placeholder={!value ? 'Шаблонное имя не задано' : ''}
            />
          )}
        />
      )}
    />
  );
};

export default RHFAutocompleteTemplateName;
