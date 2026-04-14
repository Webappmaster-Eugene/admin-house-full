import * as React from 'react';
import {
  FieldVariantsForSelectorFieldTypeGetCommand,
  FieldVariantsForSelectorFieldTypeGetAllCommand,
} from '@numart/house-admin-contracts';

import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CheckboxFreeAutocompleteProps<
  T extends FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  defaultCheckedOptionsFieldVariants:
    | FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity
    | undefined;
  valueChecks: (FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity | string)[];
  setValueChecks: (
    value: (FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity | string)[]
  ) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  fieldCategoryId: string;
}

export default function CheckboxFreeAutocomplete<
  T extends FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  helperText,
  placeholder,
  options,
  defaultCheckedOptionsFieldVariants,
  valueChecks,
  setValueChecks,
  inputValue,
  setInputValue,
  fieldCategoryId,
  ...other
}: Omit<CheckboxFreeAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  return (
    options && (
      <Autocomplete
        multiple
        freeSolo
        value={valueChecks.length !== 0 ? valueChecks : defaultCheckedOptionsFieldVariants}
        onChange={(event: any, newValue) => {
          const allOldFieldVariantsNames = newValue.map((option) =>
            typeof option === 'string' ? option : option?.value
          );
          if (new Set(allOldFieldVariantsNames).size === newValue.length) {
            setValueChecks(newValue);
            setInputValue('');
          } else {
            setInputValue(
              typeof newValue[newValue.length - 1] === 'string'
                ? (newValue[newValue.length - 1] as string)
                : ''
            );
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          if (/^(?!\s*$).+/.test(newInputValue) || newInputValue.length === 0) {
            setInputValue(newInputValue);
          }
        }}
        limitTags={5}
        noOptionsText="Вариантов не найдено"
        id="checkboxes-tags-demo"
        options={options}
        isOptionEqualToValue={(option, value) => {
          if (
            typeof option !== 'string' &&
            typeof value !== 'string' &&
            option!.uuid === value!.uuid
          ) {
            return true;
          }
          return false;
        }}
        disableCloseOnSelect
        renderTags={(
          values: (FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity | string)[],
          getTagProps
        ) =>
          values.map(
            (
              option: FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity | string,
              index: number
            ) => {
              const { key, ...tagProps } = getTagProps({ index });
              return typeof option === 'string' ? (
                <Chip variant="outlined" label={option} key={key} {...tagProps} />
              ) : (
                <Chip variant="outlined" label={option?.value} key={key} {...tagProps} />
              );
            }
          )
        }
        getOptionLabel={(option) => (typeof option === 'string' ? option : option?.value)}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          let disabled = false;

          if (typeof option !== 'string') {
            disabled =
              !!option.fieldOfCategoryMaterialUuid &&
              option.fieldOfCategoryMaterialUuid !== fieldCategoryId;
          }
          if (disabled) {
            return (
              <li key={key} {...optionProps} style={{ pointerEvents: 'none', opacity: 0.5 }}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {typeof option === 'string'
                  ? `${option} (недоступно)`
                  : `${option?.value} (недоступно)`}
              </li>
            );
          }
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                disabled={disabled}
                // unselectable="on"
              />
              {typeof option === 'string' ? option : option?.value}
            </li>
          );
        }}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Опции"
            placeholder={valueChecks.length !== 0 ? 'Опции' : ''}
          />
        )}
      />
    )
  );
}
