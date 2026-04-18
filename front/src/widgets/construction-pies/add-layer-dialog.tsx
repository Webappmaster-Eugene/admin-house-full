import { useState } from 'react';

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import { UnitMeasurementOption, UnitMeasurementSelect } from 'src/shared/unit-measurement-select';

interface MaterialOption {
  uuid: string;
  name: string;
  price?: number | null;
  unitMeasurement?: { name: string } | null;
}

interface AddLayerDialogProps {
  open: boolean;
  materials: MaterialOption[];
  unitMeasurements: UnitMeasurementOption[];
  onClose: () => void;
  onSubmit: (params: {
    materialUuid: string | null;
    name: string;
    thickness: number;
    density: number;
    consumptionPerM2: number;
    unitMeasurement: string;
    unitCost: number;
    comment: string;
  }) => Promise<void>;
}

const initialState = {
  materialUuid: null as string | null,
  name: '',
  thickness: 100,
  density: 0,
  consumptionPerM2: 1,
  unitMeasurement: 'м²',
  unitCost: 0,
  comment: '',
};

export function AddLayerDialog({
  open,
  materials,
  unitMeasurements,
  onClose,
  onSubmit,
}: AddLayerDialogProps) {
  const [state, setState] = useState(initialState);

  const handleSubmit = async () => {
    await onSubmit(state);
    setState(initialState);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Добавить слой в пирог</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
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
            renderInput={(params) => (
              <TextField {...params} label="Материал из справочника (необязательно)" />
            )}
            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
          />

          <TextField
            label="Название слоя"
            value={state.name}
            onChange={(event) => setState({ ...state, name: event.target.value })}
            fullWidth
            required
          />

          <Stack direction="row" spacing={2}>
            <TextField
              type="number"
              label="Толщина, мм"
              value={state.thickness}
              onChange={(event) => setState({ ...state, thickness: Number(event.target.value) || 0 })}
              inputProps={{ min: 0, step: 1 }}
              fullWidth
            />
            <TextField
              type="number"
              label="Плотность, кг/м³"
              value={state.density}
              onChange={(event) => setState({ ...state, density: Number(event.target.value) || 0 })}
              inputProps={{ min: 0, step: 1 }}
              fullWidth
              helperText="0 — если нерелевантно (для работ)"
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              type="number"
              label="Расход на 1 м²"
              value={state.consumptionPerM2}
              onChange={(event) =>
                setState({ ...state, consumptionPerM2: Number(event.target.value) || 0 })
              }
              inputProps={{ min: 0, step: 0.0001 }}
              fullWidth
              required
              helperText="Например, 0.2 м³/м² или 1.05 шт/м²"
            />
            <UnitMeasurementSelect
              label="Ед. изм. расхода"
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
