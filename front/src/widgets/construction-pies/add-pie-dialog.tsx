import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

interface AddPieDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (params: {
    name: string;
    description: string;
    unitMeasurement: string;
    defaultMarkupPercent: number;
  }) => Promise<void>;
}

const initialState = {
  name: '',
  description: '',
  unitMeasurement: 'м²',
  defaultMarkupPercent: 0,
};

export function AddPieDialog({ open, onClose, onSubmit }: AddPieDialogProps) {
  const [state, setState] = useState(initialState);

  const handleSubmit = async () => {
    await onSubmit(state);
    setState(initialState);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Новый пирог</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Название"
            value={state.name}
            onChange={(event) => setState({ ...state, name: event.target.value })}
            fullWidth
            required
            placeholder="Например: Теплоизоляция стены 200 мм"
          />
          <TextField
            label="Описание"
            value={state.description}
            onChange={(event) => setState({ ...state, description: event.target.value })}
            fullWidth
            multiline
            minRows={2}
          />
          <TextField
            label="Ед. измерения"
            value={state.unitMeasurement}
            onChange={(event) => setState({ ...state, unitMeasurement: event.target.value })}
            fullWidth
            required
            placeholder="м², м.п."
          />
          <TextField
            type="number"
            label="Наценка по умолчанию, %"
            value={state.defaultMarkupPercent}
            onChange={(event) =>
              setState({
                ...state,
                defaultMarkupPercent: Number(event.target.value) || 0,
              })
            }
            inputProps={{ min: 0, step: 1 }}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
