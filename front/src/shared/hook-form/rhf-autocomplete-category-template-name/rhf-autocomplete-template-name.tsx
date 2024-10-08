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
}) => {
  const { control, setValue } = useFormContext();
  // const [currentInputValueInAutocomplete, setCurrentInputValueInAutocomplete] = useState<string>();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defValue}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          disabled={disabled}
          limitTags={3}
          // forcePopupIcon
          // autoSelect
          multiple
          // selectOnFocus
          // clearOnBlur
          // handleHomeEndKeys
          onKeyDown={(
            event: React.KeyboardEvent<HTMLDivElement> & {
              defaultMuiPrevented?: boolean | undefined;
            }
          ) => {
            // if (event.key === '') {
            // }
            if (event.key === 'Enter' && 'value' in event.target && event.target?.value) {
              setValue(name, value.concat(event.target?.value));
            }
            if (event.key === 'Enter') {
              // const values = getValues().tagsTemplate;
              // const finalValues = values.push(currentInputValueInAutocomplete);
              // console.log(values);
              // setValue(name, finalValues);
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
            if (isEqual) {
              return true;
            }
            return false;
          }}
          freeSolo
          options={options}
          getOptionLabel={(option) => option}
          value={value}
          onChange={(event, newValue) => {
            setValue(name, value);
            onChange(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue);
            // setCurrentInputValueInAutocomplete(newInputValue);
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
              label="Multiple Select"
              placeholder={defValue?.length === 0 ? 'Шаблонное имя не задано' : ''}
            />
          )}
        />
      )}
    />
  );
};

export default RHFAutocompleteTemplateName;
