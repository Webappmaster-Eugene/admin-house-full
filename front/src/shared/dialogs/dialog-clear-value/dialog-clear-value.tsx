import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { DialogClearValueProps } from 'src/shared/dialogs/dialog-clear-value/dialog-clear-value.props';

export default function DialogClearValue({
  dialog,
  title = 'Вы уверены, что хотите очистить поле?',
  text = 'Удаление значения поля категории по умолчанию приведет к сбросу дефолтных значений при создании характеристик в материалах. Вы уверены?',
  onClear,
  onCancel,
}: DialogClearValueProps) {
  const handleCancelClick = () => {
    // onCancel();
    dialog.onFalse();
  };

  const handleConfirmClick = () => {
    onClear();
    dialog.onFalse();
  };
  return (
    <Dialog open={dialog.value} onClose={dialog.onFalse}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 3 }}>{text}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancelClick} variant="outlined" color="inherit">
          Отменить
        </Button>
        <Button onClick={handleConfirmClick} variant="contained">
          Очистить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
