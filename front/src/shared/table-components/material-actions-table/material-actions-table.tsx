import { useState, useEffect } from 'react';

import { green } from '@mui/material/colors';
import { Save, Check } from '@mui/icons-material';
import { Box, Fab, CircularProgress } from '@mui/material';

import { MaterialActionsTableProps } from 'src/shared/table-components/material-actions-table/material-actions-table.props';

export const MaterialActionsTable = ({ params, rowId, setRowId }: MaterialActionsTableProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmitSave = async () => {
    setLoading(true);

    const { role, active, _id } = params.row;
    const result = await updateStatus({ role, active }, _id, dispatch);
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmitSave}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};