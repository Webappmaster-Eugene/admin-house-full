'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { ProjectGetAllCommand } from '@numart/house-admin-contracts';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

import { createEstimate } from 'src/api/actions/estimate/create-estimate.action';
import { deleteEstimate } from 'src/api/actions/estimate/delete-estimate.action';
import { exportEstimate } from 'src/api/actions/estimate/export-estimate.action';
import { cloneEstimate } from 'src/api/actions/estimate/clone-estimate.action';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { EstimateBusinessValue } from 'src/shared/contracts/estimate';

import { formatMoney } from './_consts';

type Project = ProjectGetAllCommand.ResponseEntity[number];

interface EstimatesPerProject {
  project: Project;
  estimates: EstimateBusinessValue[];
}

interface EstimatesListProps {
  workspaceId: string;
  estimatesPerProject: EstimatesPerProject[];
}

export function EstimatesList({ workspaceId, estimatesPerProject }: EstimatesListProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    estimatesPerProject[0]?.project.uuid ?? ''
  );
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [markup, setMarkup] = useState<number>(0);

  const openEstimate = (estimateId: string) => {
    router.push(`/dashboard/estimates/${estimateId}`);
  };

  const handleCreate = async () => {
    if (!selectedProjectId || !name.trim()) {
      enqueueSnackbar('Укажите название сметы и проект', { variant: 'warning' });
      return;
    }
    const result = await createEstimate(workspaceId, selectedProjectId, {
      name: name.trim(),
      description: description.trim() || undefined,
      defaultMarkupPercent: markup,
    });
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось создать смету', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Смета создана', { variant: 'success' });
    setDialogOpen(false);
    setName('');
    setDescription('');
    setMarkup(0);
    router.refresh();
    router.push(`/dashboard/estimates/${(result as EstimateBusinessValue).uuid}`);
  };

  const handleDelete = async (projectId: string, estimateId: string) => {
    if (!window.confirm('Удалить смету? Действие необратимо.')) return;
    const result = await deleteEstimate(workspaceId, projectId, estimateId);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить смету', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Смета удалена', { variant: 'success' });
    router.refresh();
  };

  const handleClone = async (projectId: string, estimateId: string) => {
    enqueueSnackbar('Создаю копию...', { variant: 'info' });
    const result = await cloneEstimate(workspaceId, projectId, estimateId);
    if ('error' in result) {
      enqueueSnackbar('Не удалось скопировать смету', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Копия сметы создана', { variant: 'success' });
    router.refresh();
    router.push(`/dashboard/estimates/${result.uuid}`);
  };

  const handleExport = async (projectId: string, estimateId: string) => {
    const result = await exportEstimate(workspaceId, projectId, estimateId);
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

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Сметы</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          disabled={estimatesPerProject.length === 0}
        >
          Создать смету
        </Button>
      </Stack>

      {estimatesPerProject.length === 0 && (
        <Card>
          <CardContent>
            <Typography>
              В вашем workspace пока нет ни одного проекта. Сметы создаются в рамках проекта —
              сначала создайте проект.
            </Typography>
          </CardContent>
        </Card>
      )}

      <Stack spacing={3}>
        {estimatesPerProject.map(({ project, estimates }) => (
          <Card key={project.uuid}>
            <CardHeader title={project.name} subheader={`Смет: ${estimates.length}`} />
            <Divider />
            <CardContent>
              {estimates.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  В этом проекте ещё нет смет.
                </Typography>
              ) : (
                <List disablePadding>
                  {estimates.map((estimate) => (
                    <ListItemButton
                      key={estimate.uuid}
                      onClick={() => openEstimate(estimate.uuid)}
                      sx={{ borderRadius: 1, pr: 18 }}
                    >
                      <ListItemText
                        primary={estimate.name}
                        secondary={`Себестоимость: ${formatMoney(
                          estimate.totalCost
                        )} · Для заказчика: ${formatMoney(estimate.totalClientPrice)}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClone(project.uuid, estimate.uuid);
                          }}
                          title="Дублировать смету"
                        >
                          <ContentCopyIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleExport(project.uuid, estimate.uuid);
                          }}
                          title="Экспорт в Excel"
                        >
                          <DownloadIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(project.uuid, estimate.uuid);
                          }}
                          title="Удалить"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Создать смету</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              select
              label="Проект"
              value={selectedProjectId}
              onChange={(event) => setSelectedProjectId(event.target.value)}
              fullWidth
            >
              {estimatesPerProject.map(({ project }) => (
                <MenuItem key={project.uuid} value={project.uuid}>
                  {project.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Название"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Описание"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              type="number"
              label="Наценка по умолчанию, %"
              value={markup}
              onChange={(event) => setMarkup(Number(event.target.value) || 0)}
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
    </Box>
  );
}
