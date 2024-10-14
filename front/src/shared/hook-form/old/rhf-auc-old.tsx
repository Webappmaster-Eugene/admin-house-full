import { Controller, useFormContext } from 'react-hook-form';
import { FieldOfCategoryMaterialGetCommand } from '@numart/house-admin-contracts';

import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

interface Props<
  T extends FieldOfCategoryMaterialGetCommand.ResponseEntity,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
}

export default function RHFFieldsAutocompleteOld<
  T extends FieldOfCategoryMaterialGetCommand.ResponseEntity,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  helperText,
  placeholder,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  const { multiple } = other;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id={`autocomplete-${name}`}
          autoHighlight={!multiple}
          disableCloseOnSelect={multiple}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.uuid}>
              <Checkbox key={option.uuid} size="small" checked={selected} />
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder={placeholder} />
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.uuid + index}
                label={option.name}
                variant="soft"
                size="small"
              />
            ))
          }
          {...other}
        />
      )}
    />
  );
}
