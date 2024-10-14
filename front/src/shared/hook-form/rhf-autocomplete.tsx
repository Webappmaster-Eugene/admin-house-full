import { Controller, useFormContext } from 'react-hook-form';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import Iconify from 'src/shared/iconify';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'global-category' | string;
  helperText?: React.ReactNode;
}

export default function RHFAutocomplete<
  T extends string,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  type,
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
      render={({ field, fieldState: { error } }) => {
        if (type === 'global-category') {
          return (
            <Autocomplete
              {...field}
              noOptionsText="Вариантов не найдено"
              id={`autocomplete-${name}`}
              autoHighlight={!multiple}
              disableCloseOnSelect={multiple}
              onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
              renderOption={(props, option) => (
                // if (!option?.name) {
                //   return null;
                // }

                <li {...props} key={option}>
                  {/* <Iconify */}
                  {/*  key={option.uuid} */}
                  {/*  icon={`circle-flags:${country.code?.toLowerCase()}`} */}
                  {/*  sx={{ mr: 1 }} */}
                  {/* /> */}
                  {option}
                </li>
              )}
              renderInput={(params) => {
                const baseField = {
                  ...params,
                  label,
                  placeholder,
                  error: !!error,
                  helperText: error ? error?.message : helperText,
                  inputProps: {
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  },
                };

                if (multiple) {
                  return <TextField {...baseField} />;
                }

                return (
                  <TextField
                    {...baseField}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon="solar:global-broken" sx={{ mr: -0.5, ml: 0.5 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                );
              }}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    // icon={<Iconify icon={`circle-flags:${country.code?.toLowerCase()}`} />}
                    size="small"
                    variant="soft"
                  />
                ))
              }
              {...other}
            />
          );
        }

        return (
          <Autocomplete
            {...field}
            id={`autocomplete-${name}`}
            onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
}
