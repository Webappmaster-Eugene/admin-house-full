import { useEffect, useState } from 'react';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import { EstimateItemBusinessValue } from 'src/shared/contracts/estimate';

import { UnitMeasurementOption, UnitMeasurementSelect } from 'src/shared/unit-measurement-select';

import { EditItemFormState } from './_types';

interface EditItemDialogProps {
  open: boolean;
  item: EstimateItemBusinessValue | null;
  unitMeasurements: UnitMeasurementOption[];
  onClose: () => void;
  onSubmit: (state: EditItemFormState) => Promise<void>;
}

const emptyForm = (): EditItemFormState => ({
  name: '',
  unitMeasurement: '',
  quantity: 0,
  unitCost: 0,
  markupPercent: 0,
  comment: '',
});

const fromItem = (item: EstimateItemBusinessValue): EditItemFormState => ({
  name: item.name,
  unitMeasurement: item.unitMeasurement,
  quantity: item.quantity,
  unitCost: item.unitCost,
  markupPercent: item.markupPercent,
  comment: item.comment ?? '',
});

export function EditItemDialog({
  open,
  item,
  unitMeasurements,
  onClose,
  onSubmit,
}: EditItemDialogProps) {
  const [form, setForm] = useState<EditItemFormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  // При открытии диалога подтягиваем актуальные значения выбранной строки.
  useEffect(() => {
    if (open && item) setForm(fromItem(item));
    if (!open) setForm(emptyForm());
  }, [open, item]);

  const isUnit = item?.itemType === 'UNIT';
  const isPie = item?.itemType === 'PIE';

  const patch = (next: Partial<EditItemFormState>) => setForm((prev) => ({ ...prev, ...next }));

  const handleSubmit = async () => {
    if (!item || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Редактировать строку</DialogTitle>
      <DialogContent>
        {(isUnit || isPie) && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Строка-{isUnit ? 'единичка' : 'пирог'} состоит из snapshot-компонентов, которые
            рассчитываются автоматически. Здесь можно изменить только количество, наценку и
            комментарий — себестоимость и состав фиксируются на момент добавления.
          </Alert>
        )}

        <Stack spacing={2} mt={1}>
          <TextField
            label="Название"
            value={form.name}
            onChange={(event) => patch({ name: event.target.value })}
            fullWidth
            required
            disabled={isUnit || isPie}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              type="number"
              label="Количество"
              value={form.quantity}
              onChange={(event) => patch({ quantity: Number(event.target.value) || 0 })}
              inputProps={{ min: 0, step: 0.01 }}
              fullWidth
              required
            />
            <UnitMeasurementSelect
              label="Ед. изм."
              value={form.unitMeasurement}
              onChange={(next) => patch({ unitMeasurement: next })}
              options={unitMeasurements}
              helperText={isUnit || isPie ? 'Наследуется из шаблона' : undefined}
              required={!isUnit && !isPie}
              disabled={isUnit || isPie}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              type="number"
              label="Цена себестоимости"
              value={form.unitCost}
              onChange={(event) => patch({ unitCost: Number(event.target.value) || 0 })}
              inputProps={{ min: 0, step: 0.01 }}
              fullWidth
              disabled={isUnit || isPie}
              helperText={isUnit || isPie ? 'Сумма компонентов' : undefined}
            />
            <TextField
              type="number"
              label="Наценка, %"
              value={form.markupPercent}
              onChange={(event) => patch({ markupPercent: Number(event.target.value) || 0 })}
              inputProps={{ min: 0, step: 0.01 }}
              fullWidth
            />
          </Stack>

          <TextField
            label="Комментарий"
            value={form.comment}
            onChange={(event) => patch({ comment: event.target.value })}
            fullWidth
            multiline
            minRows={2}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
