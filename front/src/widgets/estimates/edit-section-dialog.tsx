import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import { EstimateSectionTree } from 'src/shared/contracts/estimate';

interface EditSectionDialogProps {
  open: boolean;
  section: EstimateSectionTree | null;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
}

export function EditSectionDialog({ open, section, onClose, onSubmit }: EditSectionDialogProps) {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && section) setName(section.name);
    if (!open) setName('');
  }, [open, section]);

  const handleSubmit = async () => {
    if (!name.trim() || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(name.trim());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Переименовать раздел</DialogTitle>
      <DialogContent>
        <Stack mt={1}>
          <TextField
            label="Название раздела"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            required
            autoFocus
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
