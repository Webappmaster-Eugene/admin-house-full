import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import { EstimateSectionTree } from 'src/shared/contracts/estimate';

interface AddSectionDialogProps {
  open: boolean;
  rootSections: EstimateSectionTree[];
  onClose: () => void;
  onSubmit: (params: { name: string; parentSectionUuid: string | null }) => Promise<void>;
}

export function AddSectionDialog({
  open,
  rootSections,
  onClose,
  onSubmit,
}: AddSectionDialogProps) {
  const [name, setName] = useState('');
  const [parent, setParent] = useState<string>('');

  const handleSubmit = async () => {
    await onSubmit({ name: name.trim(), parentSectionUuid: parent || null });
    setName('');
    setParent('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Новый раздел</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Название раздела"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            required
          />
          <TextField
            select
            label="Родительский раздел (необязательно)"
            value={parent}
            onChange={(event) => setParent(event.target.value)}
            fullWidth
            helperText="Оставьте пустым для создания раздела верхнего уровня"
          >
            <MenuItem value="">— Верхний уровень —</MenuItem>
            {rootSections.map((section) => (
              <MenuItem key={section.uuid} value={section.uuid}>
                {section.name}
              </MenuItem>
            ))}
          </TextField>
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
