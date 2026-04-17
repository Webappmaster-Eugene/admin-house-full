'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { createUnitTemplate } from 'src/api/actions/unit-template/create-unit-template.action';
import { deleteUnitTemplate } from 'src/api/actions/unit-template/delete-unit-template.action';
import { createUnitTemplateComponent } from 'src/api/actions/unit-template/create-component.action';
import { deleteUnitTemplateComponent } from 'src/api/actions/unit-template/delete-component.action';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';
import { UnitTemplateWithComponents } from 'src/shared/contracts/unit-template';
import { EEstimateItemType } from 'src/shared/contracts/estimate';

interface MaterialOption {
  uuid: string;
  name: string;
  price?: number | null;
  unitMeasurement?: { name: string } | null;
}

interface UnitTemplatesListProps {
  workspaceId: string;
  handbookId: string;
  templates: UnitTemplateWithComponents[];
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

export function UnitTemplatesList({
  workspaceId,
  handbookId,
  templates,
  materials,
}: UnitTemplatesListProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [componentDialogOpen, setComponentDialogOpen] = useState(false);
  const [targetTemplateId, setTargetTemplateId] = useState<string>('');

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    unitMeasurement: 'м²',
    defaultMarkupPercent: 0,
  });

  const [newComponent, setNewComponent] = useState<{
    itemType: EEstimateItemType;
    materialUuid: string | null;
    name: string;
    unitMeasurement: string;
    quantityPerUnit: number;
    unitCost: number;
    comment: string;
  }>({
    itemType: 'MATERIAL',
    materialUuid: null,
    name: '',
    unitMeasurement: 'шт',
    quantityPerUnit: 1,
    unitCost: 0,
    comment: '',
  });

  const handleCreate = async () => {
    if (!newTemplate.name.trim() || !newTemplate.unitMeasurement.trim()) {
      enqueueSnackbar('Заполните название и ед.изм.', { variant: 'warning' });
      return;
    }
    const result = await createUnitTemplate(workspaceId, handbookId, {
      name: newTemplate.name.trim(),
      description: newTemplate.description.trim() || undefined,
      unitMeasurement: newTemplate.unitMeasurement.trim(),
      defaultMarkupPercent: newTemplate.defaultMarkupPercent,
    });
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось создать единичку', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Единичка создана', { variant: 'success' });
    setDialogOpen(false);
    setNewTemplate({ name: '', description: '', unitMeasurement: 'м²', defaultMarkupPercent: 0 });
    router.refresh();
  };

  const handleDelete = async (templateId: string) => {
    if (!window.confirm('Удалить единичку? Действие необратимо.')) return;
    const result = await deleteUnitTemplate(workspaceId, handbookId, templateId);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить единичку', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Единичка удалена', { variant: 'success' });
    router.refresh();
  };

  const openAddComponent = (templateId: string) => {
    setTargetTemplateId(templateId);
    setComponentDialogOpen(true);
  };

  const handleAddComponent = async () => {
    if (!newComponent.name.trim()) {
      enqueueSnackbar('Введите название компонента', { variant: 'warning' });
      return;
    }
    const template = templates.find((t) => t.uuid === targetTemplateId);
    const orderIndex = template?.components.length ?? 0;

    const result = await createUnitTemplateComponent(workspaceId, handbookId, targetTemplateId, {
      orderIndex,
      itemType: newComponent.itemType,
      materialUuid: newComponent.materialUuid,
      name: newComponent.name.trim(),
      unitMeasurement: newComponent.unitMeasurement.trim() || 'шт',
      quantityPerUnit: newComponent.quantityPerUnit,
      unitCost: newComponent.unitCost,
      comment: newComponent.comment.trim() || null,
    });
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось добавить компонент', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Компонент добавлен', { variant: 'success' });
    setComponentDialogOpen(false);
    setNewComponent({
      itemType: 'MATERIAL',
      materialUuid: null,
      name: '',
      unitMeasurement: 'шт',
      quantityPerUnit: 1,
      unitCost: 0,
      comment: '',
    });
    router.refresh();
  };

  const handleDeleteComponent = async (templateId: string, componentId: string) => {
    if (!window.confirm('Удалить компонент?')) return;
    const result = await deleteUnitTemplateComponent(workspaceId, handbookId, templateId, componentId);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить компонент', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Компонент удалён', { variant: 'success' });
    router.refresh();
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4">Единички</Typography>
          <Typography variant="body2" color="text.secondary">
            Справочник комплексных единиц (работы + материалы) для использования в сметах
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          Создать единичку
        </Button>
      </Stack>

      {templates.length === 0 && (
        <Card>
          <CardContent>
            <Typography>В справочнике пока нет единичек. Создайте первую.</Typography>
          </CardContent>
        </Card>
      )}

      <Stack spacing={2}>
        {templates.map((template) => {
          const isExpanded = expanded === template.uuid;
          return (
            <Card key={template.uuid}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6">
                      {template.name} <small>({template.unitMeasurement})</small>
                    </Typography>
                    {template.description && (
                      <Typography variant="body2" color="text.secondary">
                        {template.description}
                      </Typography>
                    )}
                    <Typography variant="body2" mt={1}>
                      Себестоимость за 1 {template.unitMeasurement}:{' '}
                      <strong>{formatMoney(template.unitCost)}</strong> → Клиенту:{' '}
                      <strong>{formatMoney(template.unitClientPrice)}</strong> (+
                      {template.defaultMarkupPercent}%)
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={() => setExpanded(isExpanded ? null : template.uuid)}
                      title={isExpanded ? 'Свернуть' : 'Раскрыть'}
                    >
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openAddComponent(template.uuid)}
                      title="Добавить компонент"
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(template.uuid)}
                      title="Удалить единичку"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box mt={2}>
                    {template.components.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Нет компонентов. Добавьте материалы и работы.
                      </Typography>
                    ) : (
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>№</TableCell>
                              <TableCell>Тип</TableCell>
                              <TableCell>Компонент</TableCell>
                              <TableCell align="right">Расход на 1 ед.</TableCell>
                              <TableCell>Ед.</TableCell>
                              <TableCell align="right">Цена</TableCell>
                              <TableCell align="right">Итого за 1</TableCell>
                              <TableCell />
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {template.components.map((component, idx) => {
                              const totalForOne = component.quantityPerUnit * component.unitCost;
                              const typeLabel =
                                ITEM_TYPE_OPTIONS.find((o) => o.value === component.itemType)?.label ??
                                component.itemType;
                              return (
                                <TableRow key={component.uuid}>
                                  <TableCell>{idx + 1}</TableCell>
                                  <TableCell>{typeLabel}</TableCell>
                                  <TableCell>{component.name}</TableCell>
                                  <TableCell align="right">{component.quantityPerUnit}</TableCell>
                                  <TableCell>{component.unitMeasurement}</TableCell>
                                  <TableCell align="right">
                                    {formatMoney(component.unitCost)}
                                  </TableCell>
                                  <TableCell align="right">
                                    <strong>{formatMoney(totalForOne)}</strong>
                                  </TableCell>
                                  <TableCell>
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        handleDeleteComponent(template.uuid, component.uuid)
                                      }
                                      title="Удалить"
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      {/* Диалог создания единички */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Новая единичка</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Название"
              value={newTemplate.name}
              onChange={(event) => setNewTemplate({ ...newTemplate, name: event.target.value })}
              fullWidth
              required
              placeholder="Например: Монтаж окна ПВХ"
            />
            <TextField
              label="Описание"
              value={newTemplate.description}
              onChange={(event) =>
                setNewTemplate({ ...newTemplate, description: event.target.value })
              }
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              label="Ед. измерения"
              value={newTemplate.unitMeasurement}
              onChange={(event) =>
                setNewTemplate({ ...newTemplate, unitMeasurement: event.target.value })
              }
              fullWidth
              required
              placeholder="м², шт, м.п., комплект"
            />
            <TextField
              type="number"
              label="Наценка по умолчанию, %"
              value={newTemplate.defaultMarkupPercent}
              onChange={(event) =>
                setNewTemplate({
                  ...newTemplate,
                  defaultMarkupPercent: Number(event.target.value) || 0,
                })
              }
              inputProps={{ min: 0, step: 1 }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleCreate}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог добавления компонента */}
      <Dialog
        open={componentDialogOpen}
        onClose={() => setComponentDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Добавить компонент в единичку</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              select
              label="Тип"
              value={newComponent.itemType}
              onChange={(event) =>
                setNewComponent({
                  ...newComponent,
                  itemType: event.target.value as EEstimateItemType,
                })
              }
              fullWidth
            >
              {ITEM_TYPE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>

            {newComponent.itemType === 'MATERIAL' && (
              <Autocomplete<MaterialOption>
                options={materials}
                getOptionLabel={(option) => option.name}
                value={materials.find((m) => m.uuid === newComponent.materialUuid) ?? null}
                onChange={(_event, value) => {
                  setNewComponent({
                    ...newComponent,
                    materialUuid: value?.uuid ?? null,
                    name: value?.name ?? newComponent.name,
                    unitMeasurement: value?.unitMeasurement?.name ?? newComponent.unitMeasurement,
                    unitCost: value?.price ?? newComponent.unitCost,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Материал из справочника" />
                )}
                isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
              />
            )}

            <TextField
              label="Название компонента"
              value={newComponent.name}
              onChange={(event) => setNewComponent({ ...newComponent, name: event.target.value })}
              fullWidth
              required
            />
            <Stack direction="row" spacing={2}>
              <TextField
                type="number"
                label="Расход на 1 единицу"
                value={newComponent.quantityPerUnit}
                onChange={(event) =>
                  setNewComponent({
                    ...newComponent,
                    quantityPerUnit: Number(event.target.value) || 0,
                  })
                }
                inputProps={{ min: 0, step: 0.0001 }}
                fullWidth
              />
              <TextField
                label="Ед. изм. компонента"
                value={newComponent.unitMeasurement}
                onChange={(event) =>
                  setNewComponent({ ...newComponent, unitMeasurement: event.target.value })
                }
                fullWidth
              />
            </Stack>
            <TextField
              type="number"
              label="Цена себестоимости за единицу"
              value={newComponent.unitCost}
              onChange={(event) =>
                setNewComponent({ ...newComponent, unitCost: Number(event.target.value) || 0 })
              }
              inputProps={{ min: 0, step: 0.01 }}
              fullWidth
            />
            <TextField
              label="Комментарий"
              value={newComponent.comment}
              onChange={(event) =>
                setNewComponent({ ...newComponent, comment: event.target.value })
              }
              fullWidth
              multiline
              minRows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComponentDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleAddComponent}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
