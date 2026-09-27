import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { Theme, SxProps } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import TablePagination, { TablePaginationProps } from '@mui/material/TablePagination';

// ----------------------------------------------------------------------

type Props = {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
};

export default function TablePaginationCustom({
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...other
}: Props & TablePaginationProps) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination
        labelRowsPerPage="Строк на странице"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
        sx={{
          borderTopColor: 'transparent',
          // На телефоне подпись «Строк на странице» выталкивала стрелку «вперёд» за край
          // (TablePagination прокручивается и прячет её). Сам выбор количества остаётся.
          '& .MuiTablePagination-selectLabel': { display: { xs: 'none', sm: 'block' } },
          '& .MuiTablePagination-toolbar': { pl: { xs: 1, sm: 2 } },
          '& .MuiTablePagination-input': { ml: { xs: 0, sm: 1 }, mr: { xs: 1, sm: 4 } },
        }}
        lang="ru-RU"
      />

      {onChangeDense && (
        <FormControlLabel
          label="Сжать строки таблицы"
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: 'absolute',
            },
          }}
        />
      )}
    </Box>
  );
}
