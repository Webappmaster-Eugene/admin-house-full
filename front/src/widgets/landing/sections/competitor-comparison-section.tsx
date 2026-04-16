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

import Iconify from 'src/shared/iconify';

import { landingCompetitorTable } from '../landing-content';

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Iconify icon="solar:check-circle-bold" width={22} sx={{ color: 'success.main' }} />;
  }
  if (value === false) {
    return <Iconify icon="solar:close-circle-bold" width={22} sx={{ color: 'text.disabled' }} />;
  }
  return (
    <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 600 }}>
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
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', letterSpacing: 1.5, fontWeight: 700 }}
          >
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
                        color: 'primary.main',
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
