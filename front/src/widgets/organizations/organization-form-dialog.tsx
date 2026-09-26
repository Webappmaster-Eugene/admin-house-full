'use client';

import { useState, useEffect } from 'react';

import {
  Stack,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

// ----------------------------------------------------------------------

export interface OrganizationFormValues {
  name: string;
  description: string;
}

interface OrganizationFormDialogProps {
  open: boolean;
  /** Значения для редактирования; без них — создание */
  initialValues?: OrganizationFormValues;
  onClose: () => void;
  /** Возвращает true при успехе — тогда диалог закрывается */
  onSubmit: (values: OrganizationFormValues) => Promise<boolean>;
}

const EMPTY_VALUES: OrganizationFormValues = { name: '', description: '' };

export function OrganizationFormDialog({
  open,
  initialValues,
  onClose,
  onSubmit,
}: OrganizationFormDialogProps) {
  const isEdit = Boolean(initialValues);
  const [values, setValues] = useState<OrganizationFormValues>(EMPTY_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setValues(initialValues ?? EMPTY_VALUES);
      setTouched(false);
    }
  }, [open, initialValues]);

  const nameError = touched && !values.name.trim();

  const handleSubmit = async () => {
    setTouched(true);
    if (!values.name.trim()) return;
    setSubmitting(true);
    const ok = await onSubmit({ name: values.name.trim(), description: values.description.trim() });
    setSubmitting(false);
    if (ok) onClose();
  };

  return (
    <Dialog open={open} onClose={submitting ? undefined : onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Изменить организацию' : 'Новая организация'}</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          spacing={2}
          mt={1}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            autoFocus
            fullWidth
            required
            label="Название"
            placeholder="Например, ООО «СтройДом»"
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            error={nameError}
            helperText={nameError ? 'Укажите название' : ' '}
            disabled={submitting}
          />
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Описание"
            placeholder="Чем занимается, реквизиты, контакты — по желанию"
            value={values.description}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, description: event.target.value }))
            }
            disabled={submitting}
          />
          {/* Скрытая кнопка: Enter в поле названия отправляет форму */}
          <button type="submit" hidden aria-hidden tabIndex={-1} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose} disabled={submitting}>
          Отменить
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          {isEdit ? 'Сохранить' : 'Создать'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
