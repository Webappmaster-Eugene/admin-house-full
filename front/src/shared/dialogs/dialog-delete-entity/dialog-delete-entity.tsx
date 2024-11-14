import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { DialogDeleteEntityProps } from 'src/shared/dialogs/dialog-delete-entity/dialog-delete-entity.props';

export default function DialogDeleteEntity({
  dialog,
  title = 'Вы уверены, что хотите удалить единицу измерения?',
  text = 'Удаление единицы измерения безвозвратно. Вы уверены?',
  onCancel,
  onDelete,
}: DialogDeleteEntityProps) {
  const handleCancelClick = () => {
    // onClear();
    dialog.onFalse();
  };

  const handleConfirmClick = () => {
    onDelete();
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
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
