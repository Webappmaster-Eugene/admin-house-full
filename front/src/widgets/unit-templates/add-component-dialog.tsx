import { useState } from 'react';

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import { EEstimateItemType } from 'src/shared/contracts/estimate';
import { UnitMeasurementOption, UnitMeasurementSelect } from 'src/shared/unit-measurement-select';

interface MaterialOption {
  uuid: string;
  name: string;
  price?: number | null;
  unitMeasurement?: { name: string } | null;
}

interface AddComponentDialogProps {
  open: boolean;
  materials: MaterialOption[];
  unitMeasurements: UnitMeasurementOption[];
  onClose: () => void;
  onSubmit: (params: {
    itemType: EEstimateItemType;
    materialUuid: string | null;
    name: string;
    unitMeasurement: string;
    quantityPerUnit: number;
    unitCost: number;
    comment: string;
  }) => Promise<void>;
}

const ITEM_TYPE_OPTIONS: { value: EEstimateItemType; label: string }[] = [
  { value: 'MATERIAL', label: 'Материалы' },
  { value: 'MECHANISM', label: 'Механизмы' },
  { value: 'WORK', label: 'Работы' },
  { value: 'OVERHEAD', label: 'Накладные' },
];

const initialState = {
  itemType: 'MATERIAL' as EEstimateItemType,
  materialUuid: null as string | null,
  name: '',
  unitMeasurement: 'шт',
  quantityPerUnit: 1,
  unitCost: 0,
  comment: '',
};

export function AddComponentDialog({
  open,
  materials,
  unitMeasurements,
  onClose,
  onSubmit,
}: AddComponentDialogProps) {
  const [state, setState] = useState(initialState);

  const handleSubmit = async () => {
    await onSubmit(state);
    setState(initialState);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Добавить компонент в единичку</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            label="Тип"
            value={state.itemType}
            onChange={(event) =>
              setState({ ...state, itemType: event.target.value as EEstimateItemType })
            }
            fullWidth
          >
            {ITEM_TYPE_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>

          {state.itemType === 'MATERIAL' && (
            <Autocomplete<MaterialOption>
              options={materials}
              getOptionLabel={(option) => option.name}
              value={materials.find((m) => m.uuid === state.materialUuid) ?? null}
              onChange={(_event, value) =>
                setState({
                  ...state,
                  materialUuid: value?.uuid ?? null,
                  name: value?.name ?? state.name,
                  unitMeasurement: value?.unitMeasurement?.name ?? state.unitMeasurement,
                  unitCost: value?.price ?? state.unitCost,
                })
              }
              renderInput={(params) => <TextField {...params} label="Материал из справочника" />}
              isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
            />
          )}

          <TextField
            label="Название компонента"
            value={state.name}
            onChange={(event) => setState({ ...state, name: event.target.value })}
            fullWidth
            required
          />
          <Stack direction="row" spacing={2}>
            <TextField
              type="number"
              label="Расход на 1 единицу"
              value={state.quantityPerUnit}
              onChange={(event) =>
                setState({ ...state, quantityPerUnit: Number(event.target.value) || 0 })
              }
              inputProps={{ min: 0, step: 0.0001 }}
              fullWidth
            />
            <UnitMeasurementSelect
              label="Ед. изм. компонента"
              value={state.unitMeasurement}
              onChange={(next) => setState({ ...state, unitMeasurement: next })}
              options={unitMeasurements}
            />
          </Stack>
          <TextField
            type="number"
            label="Цена себестоимости за единицу"
            value={state.unitCost}
            onChange={(event) => setState({ ...state, unitCost: Number(event.target.value) || 0 })}
            inputProps={{ min: 0, step: 0.01 }}
            fullWidth
          />
          <TextField
            label="Комментарий"
            value={state.comment}
            onChange={(event) => setState({ ...state, comment: event.target.value })}
            fullWidth
            multiline
            minRows={2}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
