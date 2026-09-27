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
import EditIcon from '@mui/icons-material/Edit';

import { formatMoney } from './_consts';
import { SectionBlockProps } from './_types';
import { ItemRow } from './item-row';
import { ItemCard } from './item-card';

// Таблица строк (11 колонок) требует ~870px. Решаем по ширине самого раздела (container query),
// а не окна: вложенный подраздел уже родителя на рамку и отступы и на 1280px уже не помещается.
const TABLE_CONTAINER_QUERY = '@container (min-width: 880px)';

export function SectionBlock({
  section,
  numPrefix,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onEditSection,
  onDeleteSection,
}: SectionBlockProps) {
  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 }, containerType: 'inline-size' }}>
        {/* На телефоне суммы и кнопки не помещаются рядом с названием — ставим их под ним */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={{ xs: 0.5, sm: 2 }}
          mb={1}
        >
          <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
            {numPrefix}. {section.name}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={{ xs: 'space-between', sm: 'flex-end' }}
            sx={{ flexShrink: 0 }}
          >
            <Typography variant="body2" sx={{ flexGrow: { xs: 1, sm: 0 } }}>
              {formatMoney(section.sectionTotalCost)} →{' '}
              <strong>{formatMoney(section.sectionTotalClientPrice)}</strong>
            </Typography>
            <IconButton size="small" onClick={() => onAddItem(section.uuid)} title="Добавить строку">
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onEditSection(section)} title="Переименовать раздел">
              <EditIcon fontSize="small" />
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
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ display: 'none', [TABLE_CONTAINER_QUERY]: { display: 'block' } }}
          >
            {/* Отступы ячеек 8px вместо 16px: иначе таблица вложенного раздела не помещалась
                даже на 1440px и уезжала вбок вместе с кнопкой удаления */}
            <Table size="small" sx={{ '& .MuiTableCell-root': { px: 1 } }}>
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
                    onEdit={() => onEditItem(section.uuid, item)}
                    onDelete={() => onDeleteItem(section.uuid, item.uuid)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {section.items.length > 0 && (
          <Stack
            divider={<Divider />}
            sx={{ display: 'flex', [TABLE_CONTAINER_QUERY]: { display: 'none' } }}
          >
            {section.items.map((item, idx) => (
              <ItemCard
                key={item.uuid}
                item={item}
                num={`${numPrefix}.${idx + 1}`}
                onEdit={() => onEditItem(section.uuid, item)}
                onDelete={() => onDeleteItem(section.uuid, item.uuid)}
              />
            ))}
          </Stack>
        )}

        {section.childSections.length > 0 && (
          <Stack spacing={1} mt={2} pl={{ xs: 0, sm: 2 }}>
            {section.childSections.map((child, idx) => (
              <SectionBlock
                key={child.uuid}
                section={child}
                numPrefix={`${numPrefix}.${idx + 1}`}
                onAddItem={onAddItem}
                onEditItem={onEditItem}
                onDeleteItem={onDeleteItem}
                onEditSection={onEditSection}
                onDeleteSection={onDeleteSection}
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
