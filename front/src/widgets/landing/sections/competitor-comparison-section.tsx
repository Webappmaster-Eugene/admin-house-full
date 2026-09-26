'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import LandingIcon from '../landing-icon';
import { landingCompetitorTable } from '../landing-content';
import { accentTextColor, sectionOverlineSx } from './landing-styles';

// Текст только для скринридеров: иконки в ячейках сами по себе ничего не сообщают.
// Размеры строками: в sx число 1 означает 100%, а m: -1 — отступ темы (-8px).
const visuallyHiddenSx = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  p: 0,
  m: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return (
      <>
        <LandingIcon
          aria-hidden
          icon={value ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
          width={22}
          sx={{ color: value ? 'success.main' : 'text.disabled' }}
        />
        <Box component="span" sx={visuallyHiddenSx}>
          {value ? 'Есть' : 'Нет'}
        </Box>
      </>
    );
  }
  return (
    <Typography
      variant="caption"
      sx={{
        // warning.main (#FFAB00) на белом — контраст 1.9:1, текст почти не читается.
        color: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.warning.darker
            : theme.palette.warning.light,
        fontWeight: 600,
      }}
    >
      {value}
    </Typography>
  );
}

export default function CompetitorComparisonSection() {
  const { columns, rows } = landingCompetitorTable;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: { xs: 5, md: 8 } }}>
          <Typography variant="overline" sx={sectionOverlineSx}>
            Сравнение
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, fontWeight: 700 }}>
            Сравнение с альтернативами
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
            Посмотрите, чем SMETAS отличается от привычных инструментов для составления смет.
          </Typography>
        </Stack>

        <TableContainer
          sx={{
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            overflow: 'auto',
          }}
        >
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, minWidth: 200 }}>Возможность</TableCell>
                {columns.map((col) => (
                  <TableCell
                    key={col}
                    align="center"
                    sx={{
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      ...(col === 'SMETAS' && {
                        color: accentTextColor,
                        backgroundColor: 'primary.lighter',
                      }),
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.feature} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{row.feature}</TableCell>
                  <TableCell align="center" sx={{ backgroundColor: 'primary.lighter' }}>
                    <CellValue value={row.smetas} />
                  </TableCell>
                  <TableCell align="center">
                    <CellValue value={row.excel} />
                  </TableCell>
                  <TableCell align="center">
                    <CellValue value={row.grandSmeta} />
                  </TableCell>
                  <TableCell align="center">
                    <CellValue value={row.s1cSmeta} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
