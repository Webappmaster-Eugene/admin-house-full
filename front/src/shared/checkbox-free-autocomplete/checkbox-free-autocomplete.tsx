import * as React from 'react';
import { FieldVariantsForSelectorFieldTypeGetCommand } from '@numart/house-admin-contracts';
import { CheckboxFreeAutocompleteProps } from '@/shared/checkbox-free-autocomplete/checkbox-free-autocomplete.props';

import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ options }: CheckboxFreeAutocompleteProps) {
  return (
    options && (
      <Autocomplete
        multiple
        freeSolo
        noOptionsText="Вариантов не найдено"
        // defaultChecked={}
        id="checkboxes-tags-demo"
        limitTags={3}
        // defaultValue={options[0]}
        options={options}
        isOptionEqualToValue={(option, value) =>
          option.value === value.value && option.value === value.value
        }
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
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {typeof option === 'string' ? option : option?.value}
            </li>
          );
        }}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label="Checkboxes" placeholder="Favorites" />
        )}
      />
    )
  );
}
