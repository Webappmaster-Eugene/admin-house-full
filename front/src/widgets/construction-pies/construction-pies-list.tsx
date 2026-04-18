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
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { createConstructionPie } from 'src/api/actions/construction-pie/create-pie.action';
import { deleteConstructionPie } from 'src/api/actions/construction-pie/delete-pie.action';
import { createPieLayer } from 'src/api/actions/construction-pie/create-layer.action';
import { deletePieLayer } from 'src/api/actions/construction-pie/delete-layer.action';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';
import { ConstructionPieWithLayers } from 'src/shared/contracts/construction-pie';

import { GuideInfoAlert } from 'src/widgets/guide/guide-info-alert';

import { AddPieDialog } from './add-pie-dialog';
import { AddLayerDialog } from './add-layer-dialog';

interface MaterialOption {
  uuid: string;
  name: string;
  price?: number | null;
  unitMeasurement?: { name: string } | null;
}

interface ConstructionPiesListProps {
  workspaceId: string;
  handbookId: string;
  pies: ConstructionPieWithLayers[];
  materials: MaterialOption[];
}

const formatMoney = (value: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value);

export function ConstructionPiesList({
  workspaceId,
  handbookId,
  pies,
  materials,
}: ConstructionPiesListProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [pieDialogOpen, setPieDialogOpen] = useState(false);
  const [layerDialogOpen, setLayerDialogOpen] = useState(false);
  const [targetPieId, setTargetPieId] = useState<string>('');

  const handleCreatePie = async (params: {
    name: string;
    description: string;
    unitMeasurement: string;
    defaultMarkupPercent: number;
  }) => {
    if (!params.name.trim()) {
      enqueueSnackbar('Введите название пирога', { variant: 'warning' });
      return;
    }
    const result = await createConstructionPie(workspaceId, handbookId, {
      name: params.name.trim(),
      description: params.description.trim() || undefined,
      unitMeasurement: params.unitMeasurement.trim() || 'м²',
      defaultMarkupPercent: params.defaultMarkupPercent,
    });
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось создать пирог', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Пирог создан', { variant: 'success' });
    setPieDialogOpen(false);
    router.refresh();
  };

  const handleDeletePie = async (pieId: string) => {
    if (!window.confirm('Удалить пирог? Действие необратимо.')) return;
    const result = await deleteConstructionPie(workspaceId, handbookId, pieId);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить пирог', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Пирог удалён', { variant: 'success' });
    router.refresh();
  };

  const openAddLayer = (pieId: string) => {
    setTargetPieId(pieId);
    setLayerDialogOpen(true);
  };

  const handleAddLayer = async (params: {
    materialUuid: string | null;
    name: string;
    thickness: number;
    density: number;
    consumptionPerM2: number;
    unitMeasurement: string;
    unitCost: number;
    comment: string;
  }) => {
    if (!params.name.trim()) {
      enqueueSnackbar('Введите название слоя', { variant: 'warning' });
      return;
    }
    if (params.consumptionPerM2 <= 0) {
      enqueueSnackbar('Расход на м² должен быть положительным', { variant: 'warning' });
      return;
    }
    const pie = pies.find((p) => p.uuid === targetPieId);
    const orderIndex = pie?.layers.length ?? 0;

    const result = await createPieLayer(workspaceId, handbookId, targetPieId, {
      orderIndex,
      materialUuid: params.materialUuid,
      name: params.name.trim(),
      thickness: params.thickness,
      density: params.density,
      consumptionPerM2: params.consumptionPerM2,
      unitMeasurement: params.unitMeasurement.trim() || 'м²',
      unitCost: params.unitCost,
      comment: params.comment.trim() || null,
    });
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось добавить слой', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Слой добавлен', { variant: 'success' });
    setLayerDialogOpen(false);
    router.refresh();
  };

  const handleDeleteLayer = async (pieId: string, layerId: string) => {
    if (!window.confirm('Удалить слой?')) return;
    const result = await deletePieLayer(workspaceId, handbookId, pieId, layerId);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить слой', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Слой удалён', { variant: 'success' });
    router.refresh();
  };

  return (
    <Box>
      <GuideInfoAlert section="pies" />

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4">Пироги</Typography>
          <Typography variant="body2" color="text.secondary">
            Шаблоны многослойных конструкций (стены, полы, перекрытия) для использования в сметах
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setPieDialogOpen(true)}>
          Создать пирог
        </Button>
      </Stack>

      {pies.length === 0 && (
        <Card>
          <CardContent>
            <Typography>Пока нет ни одного пирога. Создайте первый.</Typography>
          </CardContent>
        </Card>
      )}

      <Stack spacing={2}>
        {pies.map((pie) => {
          const isExpanded = expanded === pie.uuid;
          return (
            <Card key={pie.uuid}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6">
                      {pie.name} <small>({pie.unitMeasurement})</small>
                    </Typography>
                    {pie.description && (
                      <Typography variant="body2" color="text.secondary">
                        {pie.description}
                      </Typography>
                    )}
                    <Typography variant="body2" mt={1}>
                      Общая толщина: <strong>{pie.totalThickness.toFixed(1)} мм</strong> ·
                      Себестоимость за 1 {pie.unitMeasurement}:{' '}
                      <strong>{formatMoney(pie.unitCost)}</strong> → Клиенту:{' '}
                      <strong>{formatMoney(pie.unitClientPrice)}</strong> (+
                      {pie.defaultMarkupPercent}%)
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={() => setExpanded(isExpanded ? null : pie.uuid)}
                      title={isExpanded ? 'Свернуть' : 'Раскрыть'}
                    >
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openAddLayer(pie.uuid)}
                      title="Добавить слой"
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePie(pie.uuid)}
                      title="Удалить пирог"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box mt={2}>
                    {pie.layers.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Нет слоёв. Добавьте слой, указав толщину, расход и цену материала.
                      </Typography>
                    ) : (
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>№</TableCell>
                              <TableCell>Слой</TableCell>
                              <TableCell align="right">Толщина, мм</TableCell>
                              <TableCell align="right">Плотность, кг/м³</TableCell>
                              <TableCell align="right">Расход/м²</TableCell>
                              <TableCell>Ед.</TableCell>
                              <TableCell align="right">Цена</TableCell>
                              <TableCell align="right">Итого/м²</TableCell>
                              <TableCell />
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pie.layers.map((layer, idx) => {
                              const totalForM2 = layer.consumptionPerM2 * layer.unitCost;
                              return (
                                <TableRow key={layer.uuid}>
                                  <TableCell>{idx + 1}</TableCell>
                                  <TableCell>{layer.name}</TableCell>
                                  <TableCell align="right">{layer.thickness}</TableCell>
                                  <TableCell align="right">{layer.density || '—'}</TableCell>
                                  <TableCell align="right">{layer.consumptionPerM2}</TableCell>
                                  <TableCell>{layer.unitMeasurement}</TableCell>
                                  <TableCell align="right">{formatMoney(layer.unitCost)}</TableCell>
                                  <TableCell align="right">
                                    <strong>{formatMoney(totalForM2)}</strong>
                                  </TableCell>
                                  <TableCell>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleDeleteLayer(pie.uuid, layer.uuid)}
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

      <AddPieDialog
        open={pieDialogOpen}
        onClose={() => setPieDialogOpen(false)}
        onSubmit={handleCreatePie}
      />

      <AddLayerDialog
        open={layerDialogOpen}
        materials={materials}
        onClose={() => setLayerDialogOpen(false)}
        onSubmit={handleAddLayer}
      />
    </Box>
  );
}
