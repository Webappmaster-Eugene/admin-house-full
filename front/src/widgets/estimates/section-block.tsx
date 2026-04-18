import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { formatMoney } from './_consts';
import { SectionBlockProps } from './_types';
import { ItemRow } from './item-row';

export function SectionBlock({
  section,
  numPrefix,
  onAddItem,
  onDeleteItem,
  onDeleteSection,
}: SectionBlockProps) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">
            {numPrefix}. {section.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">
              {formatMoney(section.sectionTotalCost)} →{' '}
              <strong>{formatMoney(section.sectionTotalClientPrice)}</strong>
            </Typography>
            <IconButton size="small" onClick={() => onAddItem(section.uuid)} title="Добавить строку">
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDeleteSection(section.uuid)}
              title="Удалить раздел"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
        <Divider sx={{ mb: 1 }} />

        {section.items.length > 0 && (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width={48} />
                  <TableCell>№</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Ресурс/Работа</TableCell>
                  <TableCell align="right">Кол-во</TableCell>
                  <TableCell>Ед.</TableCell>
                  <TableCell align="right">Цена</TableCell>
                  <TableCell align="right">Стоимость</TableCell>
                  <TableCell align="right">Наценка</TableCell>
                  <TableCell align="right">Для заказчика</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {section.items.map((item, idx) => (
                  <ItemRow
                    key={item.uuid}
                    item={item}
                    num={`${numPrefix}.${idx + 1}`}
                    onDelete={() => onDeleteItem(section.uuid, item.uuid)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {section.childSections.length > 0 && (
          <Stack spacing={1} mt={2} pl={3}>
            {section.childSections.map((child, idx) => (
              <SectionBlock
                key={child.uuid}
                section={child}
                numPrefix={`${numPrefix}.${idx + 1}`}
                onAddItem={onAddItem}
                onDeleteItem={onDeleteItem}
                onDeleteSection={onDeleteSection}
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
