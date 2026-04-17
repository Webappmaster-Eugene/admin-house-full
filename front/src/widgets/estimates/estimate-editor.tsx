'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

import { createEstimateSection } from 'src/api/actions/estimate/create-section.action';
import { deleteEstimateSection } from 'src/api/actions/estimate/delete-section.action';
import { createEstimateItem } from 'src/api/actions/estimate/create-item.action';
import { deleteEstimateItem } from 'src/api/actions/estimate/delete-item.action';
import { exportEstimate } from 'src/api/actions/estimate/export-estimate.action';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';
import {
  EEstimateItemType,
  EstimateFull,
  EstimateItemBusinessValue,
  EstimateSectionTree,
} from 'src/shared/contracts/estimate';

interface MaterialOption {
  uuid: string;
  name: string;
  price?: number | null;
  unitMeasurement?: { name: string } | null;
}

interface EstimateEditorProps {
  workspaceId: string;
  projectId: string;
  estimate: EstimateFull;
  materials: MaterialOption[];
}

const ITEM_TYPE_OPTIONS: { value: EEstimateItemType; label: string }[] = [
  { value: 'MATERIAL', label: 'Материалы' },
  { value: 'MECHANISM', label: 'Механизмы' },
  { value: 'WORK', label: 'Работы' },
  { value: 'OVERHEAD', label: 'Накладные' },
];

const formatMoney = (value: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value);

export function EstimateEditor({ workspaceId, projectId, estimate, materials }: EstimateEditorProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionParent, setNewSectionParent] = useState<string>('');

  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [targetSectionId, setTargetSectionId] = useState<string>('');
  const [newItem, setNewItem] = useState<{
    itemType: EEstimateItemType;
    materialUuid: string | null;
    name: string;
    unitMeasurement: string;
    quantity: number;
    unitCost: number;
    markupPercent: number;
    comment: string;
  }>({
    itemType: 'MATERIAL',
    materialUuid: null,
    name: '',
    unitMeasurement: 'шт',
    quantity: 1,
    unitCost: 0,
    markupPercent: estimate.defaultMarkupPercent ?? 0,
    comment: '',
  });

  const leafSections = useMemo(() => flattenSections(estimate.sections), [estimate.sections]);

  const handleExport = async () => {
    const result = await exportEstimate(workspaceId, projectId, estimate.uuid);
    if ('error' in result) {
      enqueueSnackbar('Не удалось выгрузить Excel', { variant: 'error' });
      return;
    }
    const byteArray = Uint8Array.from(atob(result.base64), (c) => c.charCodeAt(0));
    const blob = new Blob([byteArray], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = result.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddSection = async () => {
    if (!newSectionName.trim()) {
      enqueueSnackbar('Введите название раздела', { variant: 'warning' });
      return;
    }
    const siblings = newSectionParent
      ? estimate.sections.find((s) => s.uuid === newSectionParent)?.childSections ?? []
      : estimate.sections;
    const orderIndex = siblings.length;
    const result = await createEstimateSection(workspaceId, projectId, estimate.uuid, {
      name: newSectionName.trim(),
      orderIndex,
      parentSectionUuid: newSectionParent || null,
    });
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось создать раздел', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Раздел создан', { variant: 'success' });
    setSectionDialogOpen(false);
    setNewSectionName('');
    setNewSectionParent('');
    router.refresh();
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!window.confirm('Удалить раздел вместе со строками?')) return;
    const result = await deleteEstimateSection(workspaceId, projectId, estimate.uuid, sectionId);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить раздел', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Раздел удалён', { variant: 'success' });
    router.refresh();
  };

  const openAddItem = (sectionId: string) => {
    setTargetSectionId(sectionId);
    setNewItem((prev) => ({ ...prev, markupPercent: estimate.defaultMarkupPercent ?? 0 }));
    setItemDialogOpen(true);
  };

  const handleAddItem = async () => {
    if (!newItem.name.trim()) {
      enqueueSnackbar('Введите название строки', { variant: 'warning' });
      return;
    }
    if (newItem.quantity <= 0 || newItem.unitCost < 0) {
      enqueueSnackbar('Количество и цена должны быть положительными', { variant: 'warning' });
      return;
    }
    const section = findSection(estimate.sections, targetSectionId);
    const orderIndex = section?.items.length ?? 0;

    const result = await createEstimateItem(workspaceId, projectId, estimate.uuid, targetSectionId, {
      orderIndex,
      itemType: newItem.itemType,
      materialUuid: newItem.materialUuid,
      name: newItem.name.trim(),
      unitMeasurement: newItem.unitMeasurement.trim() || 'шт',
      quantity: newItem.quantity,
      unitCost: newItem.unitCost,
      markupPercent: newItem.markupPercent,
      comment: newItem.comment.trim() || null,
    });
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось добавить строку', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Строка добавлена', { variant: 'success' });
    setItemDialogOpen(false);
    setNewItem({
      itemType: 'MATERIAL',
      materialUuid: null,
      name: '',
      unitMeasurement: 'шт',
      quantity: 1,
      unitCost: 0,
      markupPercent: estimate.defaultMarkupPercent ?? 0,
      comment: '',
    });
    router.refresh();
  };

  const handleDeleteItem = async (sectionId: string, itemId: string) => {
    if (!window.confirm('Удалить строку?')) return;
    const result = await deleteEstimateItem(
      workspaceId,
      projectId,
      estimate.uuid,
      sectionId,
      itemId
    );
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить строку', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Строка удалена', { variant: 'success' });
    router.refresh();
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4">{estimate.name}</Typography>
          {estimate.description && (
            <Typography variant="body2" color="text.secondary">
              {estimate.description}
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setSectionDialogOpen(true)}
          >
            Добавить раздел
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExport}>
            Экспорт в Excel
          </Button>
        </Stack>
      </Stack>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction="row" spacing={4}>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Себестоимость
              </Typography>
              <Typography variant="h6">{formatMoney(estimate.totalCost)}</Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Цена для заказчика
              </Typography>
              <Typography variant="h6">{formatMoney(estimate.totalClientPrice)}</Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Наценка по умолчанию
              </Typography>
              <Typography variant="h6">{estimate.defaultMarkupPercent}%</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {estimate.sections.length === 0 && (
        <Card>
          <CardContent>
            <Typography>Смета пуста. Добавьте первый раздел, чтобы начать.</Typography>
          </CardContent>
        </Card>
      )}

      <Stack spacing={2}>
        {estimate.sections.map((section, idx) => (
          <SectionBlock
            key={section.uuid}
            section={section}
            numPrefix={`${idx + 1}`}
            onAddItem={openAddItem}
            onDeleteItem={handleDeleteItem}
            onDeleteSection={handleDeleteSection}
          />
        ))}
      </Stack>

      {/* Диалог создания раздела */}
      <Dialog open={sectionDialogOpen} onClose={() => setSectionDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Новый раздел</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Название раздела"
              value={newSectionName}
              onChange={(event) => setNewSectionName(event.target.value)}
              fullWidth
              required
            />
            <TextField
              select
              label="Родительский раздел (необязательно)"
              value={newSectionParent}
              onChange={(event) => setNewSectionParent(event.target.value)}
              fullWidth
              helperText="Оставьте пустым для создания раздела верхнего уровня"
            >
              <MenuItem value="">— Верхний уровень —</MenuItem>
              {estimate.sections.map((section) => (
                <MenuItem key={section.uuid} value={section.uuid}>
                  {section.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSectionDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleAddSection}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог добавления строки */}
      <Dialog open={itemDialogOpen} onClose={() => setItemDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Добавить строку</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              select
              label="Тип"
              value={newItem.itemType}
              onChange={(event) =>
                setNewItem({ ...newItem, itemType: event.target.value as EEstimateItemType })
              }
              fullWidth
            >
              {ITEM_TYPE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>

            {newItem.itemType === 'MATERIAL' && (
              <Autocomplete<MaterialOption>
                options={materials}
                getOptionLabel={(option) => option.name}
                value={materials.find((m) => m.uuid === newItem.materialUuid) ?? null}
                onChange={(_event, value) => {
                  setNewItem({
                    ...newItem,
                    materialUuid: value?.uuid ?? null,
                    name: value?.name ?? newItem.name,
                    unitMeasurement:
                      value?.unitMeasurement?.name ?? newItem.unitMeasurement,
                    unitCost: value?.price ?? newItem.unitCost,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Материал из справочника"
                    helperText="Выберите материал — название, ед.изм. и цена подставятся автоматически"
                  />
                )}
                isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
              />
            )}

            <TextField
              label="Название"
              value={newItem.name}
              onChange={(event) => setNewItem({ ...newItem, name: event.target.value })}
              fullWidth
              required
            />
            <Stack direction="row" spacing={2}>
              <TextField
                type="number"
                label="Количество"
                value={newItem.quantity}
                onChange={(event) =>
                  setNewItem({ ...newItem, quantity: Number(event.target.value) || 0 })
                }
                fullWidth
                inputProps={{ min: 0, step: 0.01 }}
              />
              <TextField
                label="Ед. изм."
                value={newItem.unitMeasurement}
                onChange={(event) =>
                  setNewItem({ ...newItem, unitMeasurement: event.target.value })
                }
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                type="number"
                label="Цена себестоимости"
                value={newItem.unitCost}
                onChange={(event) =>
                  setNewItem({ ...newItem, unitCost: Number(event.target.value) || 0 })
                }
                fullWidth
                inputProps={{ min: 0, step: 0.01 }}
              />
              <TextField
                type="number"
                label="Наценка, %"
                value={newItem.markupPercent}
                onChange={(event) =>
                  setNewItem({ ...newItem, markupPercent: Number(event.target.value) || 0 })
                }
                fullWidth
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Stack>
            <TextField
              label="Комментарий"
              value={newItem.comment}
              onChange={(event) => setNewItem({ ...newItem, comment: event.target.value })}
              fullWidth
              multiline
              minRows={2}
            />
            {leafSections.length > 1 && (
              <TextField
                select
                label="Раздел"
                value={targetSectionId}
                onChange={(event) => setTargetSectionId(event.target.value)}
                fullWidth
              >
                {leafSections.map((section) => (
                  <MenuItem key={section.uuid} value={section.uuid}>
                    {section.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleAddItem}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function flattenSections(
  sections: EstimateSectionTree[],
  prefix = ''
): { uuid: string; label: string }[] {
  const out: { uuid: string; label: string }[] = [];
  sections.forEach((s, idx) => {
    const label = prefix ? `${prefix}.${idx + 1} ${s.name}` : `${idx + 1}. ${s.name}`;
    out.push({ uuid: s.uuid, label });
    out.push(...flattenSections(s.childSections, prefix ? `${prefix}.${idx + 1}` : `${idx + 1}`));
  });
  return out;
}

function findSection(
  sections: EstimateSectionTree[],
  uuid: string
): EstimateSectionTree | null {
  return sections.reduce<EstimateSectionTree | null>((found, section) => {
    if (found) return found;
    if (section.uuid === uuid) return section;
    return findSection(section.childSections, uuid);
  }, null);
}

interface SectionBlockProps {
  section: EstimateSectionTree;
  numPrefix: string;
  onAddItem: (sectionId: string) => void;
  onDeleteItem: (sectionId: string, itemId: string) => void;
  onDeleteSection: (sectionId: string) => void;
}

function SectionBlock({
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
            <IconButton size="small" onClick={() => onDeleteSection(section.uuid)} title="Удалить раздел">
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

function ItemRow({
  item,
  num,
  onDelete,
}: {
  item: EstimateItemBusinessValue;
  num: string;
  onDelete: () => void;
}) {
  const typeLabel = ITEM_TYPE_OPTIONS.find((o) => o.value === item.itemType)?.label ?? item.itemType;
  return (
    <TableRow hover>
      <TableCell>{num}</TableCell>
      <TableCell>{typeLabel}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell align="right">{item.quantity}</TableCell>
      <TableCell>{item.unitMeasurement}</TableCell>
      <TableCell align="right">{formatMoney(item.unitCost)}</TableCell>
      <TableCell align="right">{formatMoney(item.totalCost)}</TableCell>
      <TableCell align="right">{item.markupPercent}%</TableCell>
      <TableCell align="right">
        <strong>{formatMoney(item.totalClientPrice)}</strong>
      </TableCell>
      <TableCell>
        <IconButton size="small" onClick={onDelete} title="Удалить строку">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
