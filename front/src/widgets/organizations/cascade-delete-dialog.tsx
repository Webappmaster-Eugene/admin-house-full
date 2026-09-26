'use client';

import { useState, useEffect } from 'react';

import {
  Alert,
  Stack,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';

import { pluralize } from 'src/utils/helpers/pluralize.helper';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { getAllEstimatesInProject } from 'src/api/actions/estimate/get-all-estimates-in-project.action';

// ----------------------------------------------------------------------

type EstimatesCount =
  | { status: 'loading' }
  | { status: 'ready'; count: number }
  | { status: 'failed' };

interface CascadeDeleteDialogProps {
  open: boolean;
  workspaceId: string;
  /** «организацию» / «проект» — винительный падеж для заголовка */
  entityLabel: string;
  entityName: string;
  /** Проекты, которые удалятся вместе с сущностью (для проекта — он сам) */
  projectIds: string[];
  /** Показывать ли число проектов: при удалении организации — да, при удалении проекта — нет */
  showProjectsCount: boolean;
  onClose: () => void;
  /** Возвращает true при успехе — тогда диалог закрывается */
  onConfirm: () => Promise<boolean>;
}

export function CascadeDeleteDialog({
  open,
  workspaceId,
  entityLabel,
  entityName,
  projectIds,
  showProjectsCount,
  onClose,
  onConfirm,
}: CascadeDeleteDialogProps) {
  const [estimates, setEstimates] = useState<EstimatesCount>({ status: 'loading' });
  const [typedName, setTypedName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Ключ, а не массив: новый массив на каждом рендере родителя перезапускал бы подсчёт.
  const projectIdsKey = projectIds.join(',');

  useEffect(() => {
    if (!open) return undefined;

    setTypedName('');
    const ids = projectIdsKey ? projectIdsKey.split(',') : [];
    if (ids.length === 0) {
      setEstimates({ status: 'ready', count: 0 });
      return undefined;
    }

    let cancelled = false;
    setEstimates({ status: 'loading' });
    Promise.all(ids.map((projectId) => getAllEstimatesInProject(workspaceId, projectId)))
      .then((results) => {
        if (cancelled) return;
        if (results.some((result) => isErrorFieldTypeGuard(result) || !Array.isArray(result))) {
          setEstimates({ status: 'failed' });
          return;
        }
        const count = results.reduce(
          (sum, result) => sum + (Array.isArray(result) ? result.length : 0),
          0
        );
        setEstimates({ status: 'ready', count });
      })
      .catch(() => {
        if (!cancelled) setEstimates({ status: 'failed' });
      });

    return () => {
      cancelled = true;
    };
  }, [open, workspaceId, projectIdsKey]);

  const projectsCount = showProjectsCount ? projectIds.length : 0;
  // Если вместе с сущностью пропадают проекты или сметы (или посчитать их не удалось) —
  // просим ввести название: случайный клик не должен стирать чужую работу.
  const needsTypedConfirmation =
    projectsCount > 0 || estimates.status !== 'ready' || estimates.count > 0;
  const nameMatches = typedName.trim() === entityName.trim();
  const canDelete =
    !submitting && estimates.status !== 'loading' && (!needsTypedConfirmation || nameMatches);

  const handleConfirm = async () => {
    setSubmitting(true);
    const ok = await onConfirm();
    setSubmitting(false);
    if (ok) onClose();
  };

  const consequences: string[] = [];
  if (projectsCount > 0) {
    consequences.push(pluralize(projectsCount, ['проект', 'проекта', 'проектов']));
  }
  if (estimates.status === 'ready' && estimates.count > 0) {
    consequences.push(pluralize(estimates.count, ['смета', 'сметы', 'смет']));
  }

  return (
    <Dialog open={open} onClose={submitting ? undefined : onClose} fullWidth maxWidth="sm">
      <DialogTitle>{`Удалить ${entityLabel} «${entityName}»?`}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {estimates.status === 'loading' && (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CircularProgress size={18} />
              <Typography variant="body2">Проверяю, какие сметы удалятся…</Typography>
            </Stack>
          )}

          {estimates.status === 'failed' && (
            <Alert severity="warning">
              Не удалось посчитать сметы. Считайте, что все сметы
              {showProjectsCount ? ' её проектов' : ' проекта'} будут удалены.
            </Alert>
          )}

          {estimates.status === 'ready' && consequences.length > 0 && (
            <Alert severity="error">
              {`Безвозвратно удалятся также: ${consequences.join(' и ')}.`}
            </Alert>
          )}

          {estimates.status === 'ready' && consequences.length === 0 && (
            <Typography variant="body2">
              {showProjectsCount
                ? 'В организации нет проектов — удалится только она сама.'
                : 'В проекте нет смет — удалится только он сам.'}
            </Typography>
          )}

          {needsTypedConfirmation && estimates.status !== 'loading' && (
            <TextField
              autoFocus
              fullWidth
              label="Название для подтверждения"
              helperText={`Введите «${entityName}», чтобы подтвердить удаление`}
              value={typedName}
              onChange={(event) => setTypedName(event.target.value)}
              disabled={submitting}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose} disabled={submitting}>
          Отменить
        </Button>
        <Button variant="contained" color="error" onClick={handleConfirm} disabled={!canDelete}>
          {submitting ? 'Удаляю…' : 'Удалить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
