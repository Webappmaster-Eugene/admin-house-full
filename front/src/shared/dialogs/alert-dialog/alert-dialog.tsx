import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { AlertDialogProps } from 'src/shared/dialogs/alert-dialog/alert-dialog.props';

export default function AlertDialog({
  isDialogOpen,
  onClickYes,
  titleDialog,
  textDialog,
}: AlertDialogProps) {
  return (
    <Dialog open={isDialogOpen.value} onClose={isDialogOpen.onFalse}>
      <DialogTitle>{titleDialog || 'Подтверждение действий на платформе'}</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>{textDialog || 'Вы уверены?'}</DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={isDialogOpen.onFalse}>
          Отменить
        </Button>
        <Button variant="contained" onClick={onClickYes} autoFocus>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
