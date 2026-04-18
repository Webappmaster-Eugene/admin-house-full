'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { createUnitTemplate } from 'src/api/actions/unit-template/create-unit-template.action';
import { deleteUnitTemplate } from 'src/api/actions/unit-template/delete-unit-template.action';
import { createUnitTemplateComponent } from 'src/api/actions/unit-template/create-component.action';
import { deleteUnitTemplateComponent } from 'src/api/actions/unit-template/delete-component.action';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';
import { UnitTemplateWithComponents } from 'src/shared/contracts/unit-template';
import { EEstimateItemType } from 'src/shared/contracts/estimate';

import { GuideInfoAlert } from 'src/widgets/guide/guide-info-alert';

import { AddUnitTemplateDialog } from './add-unit-template-dialog';
import { AddComponentDialog } from './add-component-dialog';

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

const ITEM_TYPE_LABELS: Record<string, string> = {
  MATERIAL: 'Материалы',
  MECHANISM: 'Механизмы',
  WORK: 'Работы',
  OVERHEAD: 'Накладные',
};

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
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [componentDialogOpen, setComponentDialogOpen] = useState(false);
  const [targetTemplateId, setTargetTemplateId] = useState<string>('');

  const handleCreateTemplate = async (params: {
    name: string;
    description: string;
    unitMeasurement: string;
    defaultMarkupPercent: number;
  }) => {
    if (!params.name.trim() || !params.unitMeasurement.trim()) {
      enqueueSnackbar('Заполните название и ед.изм.', { variant: 'warning' });
      return;
    }
    const result = await createUnitTemplate(workspaceId, handbookId, {
      name: params.name.trim(),
      description: params.description.trim() || undefined,
      unitMeasurement: params.unitMeasurement.trim(),
      defaultMarkupPercent: params.defaultMarkupPercent,
    });
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось создать единичку', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Единичка создана', { variant: 'success' });
    setTemplateDialogOpen(false);
    router.refresh();
  };

  const handleDeleteTemplate = async (templateId: string) => {
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

  const handleAddComponent = async (params: {
    itemType: EEstimateItemType;
    materialUuid: string | null;
    name: string;
    unitMeasurement: string;
    quantityPerUnit: number;
    unitCost: number;
    comment: string;
  }) => {
    if (!params.name.trim()) {
      enqueueSnackbar('Введите название компонента', { variant: 'warning' });
      return;
    }
    const template = templates.find((t) => t.uuid === targetTemplateId);
    const orderIndex = template?.components.length ?? 0;
    const result = await createUnitTemplateComponent(
      workspaceId,
      handbookId,
      targetTemplateId,
      {
        orderIndex,
        itemType: params.itemType,
        materialUuid: params.materialUuid,
        name: params.name.trim(),
        unitMeasurement: params.unitMeasurement.trim() || 'шт',
        quantityPerUnit: params.quantityPerUnit,
        unitCost: params.unitCost,
        comment: params.comment.trim() || null,
      }
    );
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось добавить компонент', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Компонент добавлен', { variant: 'success' });
    setComponentDialogOpen(false);
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
      <GuideInfoAlert section="units" />

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4">Единички</Typography>
          <Typography variant="body2" color="text.secondary">
            Шаблоны комплексных единиц работ (материал + работа на 1 ед.) для использования в сметах
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setTemplateDialogOpen(true)}>
          Создать единичку
        </Button>
      </Stack>

      {templates.length === 0 && (
        <Card>
          <CardContent>
            <Typography>Пока нет ни одной единички. Создайте первую.</Typography>
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
                      onClick={() => handleDeleteTemplate(template.uuid)}
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
                                ITEM_TYPE_LABELS[component.itemType] ?? component.itemType;
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

      <AddUnitTemplateDialog
        open={templateDialogOpen}
        onClose={() => setTemplateDialogOpen(false)}
        onSubmit={handleCreateTemplate}
      />

      <AddComponentDialog
        open={componentDialogOpen}
        materials={materials}
        onClose={() => setComponentDialogOpen(false)}
        onSubmit={handleAddComponent}
      />
    </Box>
  );
}
