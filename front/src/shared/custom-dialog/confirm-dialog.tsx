import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { dialogClasses } from '@mui/material/Dialog';

import { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
      sx={{
        [dialogClasses.root]: { backgroundColor: 'rgba(0, 0, 0, 0.35)' },
        [dialogClasses.paper]:
          'box-shadow: 0px 11px 15px -7px rgba(145, 158, 171, 0.2), 0px 24px 38px 3px rgba(145, 158, 171, 0.14), 0px 9px 46px 8px rgba(145, 158, 171, 0.12)',
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Отменить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
