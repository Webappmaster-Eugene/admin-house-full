import CheckboxesTags from '@/shared/checkbox-free-autocomplete/checkbox-free-autocomplete';
import { FormVariantsChangingDialogProps } from '@/shared/dialogs/form-variants-changing-dialog/form-variants-changing-dialog.props';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function FormVariantsChangingDialog({
  options,
  dialog,
}: FormVariantsChangingDialogProps) {
  return (
    <Dialog open={dialog.value} onClose={dialog.onFalse}>
      <DialogTitle>Subscribe</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 3 }}>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </Typography>

        {/* <TextField */}
        {/*  autoFocus */}
        {/*  fullWidth */}
        {/*  type="email" */}
        {/*  margin="dense" */}
        {/*  variant="outlined" */}
        {/*  label="Email Address" */}
        {/* /> */}
        <CheckboxesTags options={options} />
      </DialogContent>

      <DialogActions>
        <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={dialog.onFalse} variant="contained">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
