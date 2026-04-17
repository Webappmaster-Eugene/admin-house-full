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
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  EstimateItemComponentBusinessValue,
  EstimateSectionTree,
} from 'src/shared/contracts/estimate';
import { UnitTemplateWithComponents } from 'src/shared/contracts/unit-template';

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
  unitTemplates: UnitTemplateWithComponents[];
}

const ITEM_TYPE_OPTIONS: { value: EEstimateItemType; label: string }[] = [
  { value: 'MATERIAL', label: 'Материалы' },
  { value: 'MECHANISM', label: 'Механизмы' },
  { value: 'WORK', label: 'Работы' },
  { value: 'OVERHEAD', label: 'Накладные' },
  { value: 'UNIT', label: 'Единичка' },
];

type ItemSourceMode = 'manual' | 'template';

const formatMoney = (value: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value);

export function EstimateEditor({
  workspaceId,
  projectId,
  estimate,
  materials,
  unitTemplates,
}: EstimateEditorProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionParent, setNewSectionParent] = useState<string>('');

  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [targetSectionId, setTargetSectionId] = useState<string>('');
  const [itemSourceMode, setItemSourceMode] = useState<ItemSourceMode>('manual');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

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

  const selectedTemplate = useMemo(
    () => unitTemplates.find((t) => t.uuid === selectedTemplateId) ?? null,
    [selectedTemplateId, unitTemplates]
  );

  const closeItemDialog = () => {
    setItemDialogOpen(false);
    setSelectedTemplateId(null);
    setItemSourceMode('manual');
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
  };

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
    setItemSourceMode('manual');
    setSelectedTemplateId(null);
    setNewItem((prev) => ({ ...prev, markupPercent: estimate.defaultMarkupPercent ?? 0 }));
    setItemDialogOpen(true);
  };

  const handleAddItem = async () => {
    const section = findSection(estimate.sections, targetSectionId);
    const orderIndex = section?.items.length ?? 0;

    if (itemSourceMode === 'template') {
      if (!selectedTemplateId) {
        enqueueSnackbar('Выберите единичку', { variant: 'warning' });
        return;
      }
      if (newItem.quantity <= 0) {
        enqueueSnackbar('Количество должно быть положительным', { variant: 'warning' });
        return;
      }
      const result = await createEstimateItem(
        workspaceId,
        projectId,
        estimate.uuid,
        targetSectionId,
        {
          orderIndex,
          itemType: 'UNIT',
          unitTemplateUuid: selectedTemplateId,
          quantity: newItem.quantity,
          markupPercent: newItem.markupPercent,
          comment: newItem.comment.trim() || null,
        }
      );
      if (isErrorFieldTypeGuard(result)) {
        enqueueSnackbar('Не удалось добавить единичку', { variant: 'error' });
        return;
      }
      enqueueSnackbar('Единичка добавлена', { variant: 'success' });
      closeItemDialog();
      router.refresh();
      return;
    }

    if (!newItem.name.trim()) {
      enqueueSnackbar('Введите название строки', { variant: 'warning' });
      return;
    }
    if (newItem.quantity <= 0 || newItem.unitCost < 0) {
      enqueueSnackbar('Количество и цена должны быть положительными', { variant: 'warning' });
      return;
    }

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
    closeItemDialog();
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
      <Dialog open={itemDialogOpen} onClose={closeItemDialog} fullWidth maxWidth="md">
        <DialogTitle>Добавить строку</DialogTitle>
        <DialogContent>
          <Tabs
            value={itemSourceMode}
            onChange={(_event, value) => setItemSourceMode(value as ItemSourceMode)}
            sx={{ mb: 2 }}
          >
            <Tab value="manual" label="Обычная строка" />
            <Tab
              value="template"
              label={`Из единички (${unitTemplates.length})`}
              disabled={unitTemplates.length === 0}
            />
          </Tabs>

          {itemSourceMode === 'template' ? (
            <Stack spacing={2} mt={1}>
              <Autocomplete<UnitTemplateWithComponents>
                options={unitTemplates}
                getOptionLabel={(option) => `${option.name} (${option.unitMeasurement})`}
                value={selectedTemplate}
                onChange={(_event, value) => setSelectedTemplateId(value?.uuid ?? null)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Единичка из справочника"
                    helperText="Компоненты скопируются как snapshot — последующие изменения шаблона не коснутся сметы"
                  />
                )}
                isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
              />

              {selectedTemplate && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Состав «{selectedTemplate.name}» за 1 {selectedTemplate.unitMeasurement}:
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Компонент</TableCell>
                            <TableCell align="right">Расход/ед.</TableCell>
                            <TableCell>Ед.</TableCell>
                            <TableCell align="right">Цена</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedTemplate.components.map((component) => (
                            <TableRow key={component.uuid}>
                              <TableCell>{component.name}</TableCell>
                              <TableCell align="right">{component.quantityPerUnit}</TableCell>
                              <TableCell>{component.unitMeasurement}</TableCell>
                              <TableCell align="right">{formatMoney(component.unitCost)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Typography variant="body2" mt={1}>
                      Себестоимость: <strong>{formatMoney(selectedTemplate.unitCost)}</strong> за{' '}
                      {selectedTemplate.unitMeasurement}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              <Stack direction="row" spacing={2}>
                <TextField
                  type="number"
                  label={`Количество (${selectedTemplate?.unitMeasurement ?? 'ед'})`}
                  value={newItem.quantity}
                  onChange={(event) =>
                    setNewItem({ ...newItem, quantity: Number(event.target.value) || 0 })
                  }
                  inputProps={{ min: 0, step: 0.01 }}
                  fullWidth
                />
                <TextField
                  type="number"
                  label="Наценка, %"
                  value={newItem.markupPercent}
                  onChange={(event) =>
                    setNewItem({ ...newItem, markupPercent: Number(event.target.value) || 0 })
                  }
                  inputProps={{ min: 0, step: 0.01 }}
                  fullWidth
                  helperText="По умолчанию — наценка единички или сметы"
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
            </Stack>
          ) : (
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
                {ITEM_TYPE_OPTIONS.filter((opt) => opt.value !== 'UNIT').map((opt) => (
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
                      unitMeasurement: value?.unitMeasurement?.name ?? newItem.unitMeasurement,
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
            </Stack>
          )}

          {leafSections.length > 1 && (
            <Box mt={2}>
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
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeItemDialog}>Отмена</Button>
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

function ItemRow({
  item,
  num,
  onDelete,
}: {
  item: EstimateItemBusinessValue;
  num: string;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const typeLabel = ITEM_TYPE_OPTIONS.find((o) => o.value === item.itemType)?.label ?? item.itemType;
  const isUnit = item.itemType === 'UNIT';
  const hasComponents = (item.components?.length ?? 0) > 0;

  return (
    <>
      <TableRow hover>
        <TableCell>
          {hasComponents && (
            <IconButton size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>{num}</TableCell>
        <TableCell>
          {isUnit ? <Chip label={typeLabel} size="small" color="warning" /> : typeLabel}
        </TableCell>
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

      {expanded &&
        (item.components ?? []).map((component, idx) => (
          <ComponentRow
            key={component.uuid}
            component={component}
            num={`${num}.${idx + 1}`}
          />
        ))}
    </>
  );
}

function ComponentRow({
  component,
  num,
}: {
  component: EstimateItemComponentBusinessValue;
  num: string;
}) {
  const typeLabel =
    ITEM_TYPE_OPTIONS.find((o) => o.value === component.itemType)?.label ?? component.itemType;
  return (
    <TableRow sx={{ bgcolor: 'action.hover' }}>
      <TableCell />
      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary' }}>{num}</TableCell>
      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary' }}>{typeLabel}</TableCell>
      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
        ↳ {component.name}
      </TableCell>
      <TableCell align="right">{component.quantityPerUnit}</TableCell>
      <TableCell>{component.unitMeasurement}</TableCell>
      <TableCell align="right">{formatMoney(component.unitCost)}</TableCell>
      <TableCell align="right">{formatMoney(component.totalCost)}</TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  );
}
