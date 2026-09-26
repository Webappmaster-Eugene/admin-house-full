'use client';

import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OrganizationGetAllCommand } from '@numart/house-admin-contracts';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  Link,
  Stack,
  Button,
  Tooltip,
  IconButton,
  Typography,
  CardContent,
} from '@mui/material';

import { paths } from 'src/utils/routes/paths';
import { pluralize } from 'src/utils/helpers/pluralize.helper';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { createOrganization } from 'src/api/actions/organization/create-organization.action';
import { updateOrganization } from 'src/api/actions/organization/update-organization.action';
import { deleteOrganization } from 'src/api/actions/organization/delete-organization.action';

import { CascadeDeleteDialog } from './cascade-delete-dialog';
import { OrganizationFormDialog, OrganizationFormValues } from './organization-form-dialog';

// ----------------------------------------------------------------------

type Organization = OrganizationGetAllCommand.ResponseEntity[number];

interface OrganizationsListProps {
  workspaceId: string;
  organizations: OrganizationGetAllCommand.ResponseEntity;
}

export function OrganizationsList({ workspaceId, organizations }: OrganizationsListProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Флаг открытия отдельно от цели: при закрытии цель живёт до конца анимации, заголовок не мигает.
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Organization | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<Organization | null>(null);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (organization: Organization) => {
    setEditing(organization);
    setFormOpen(true);
  };
  const openDelete = (organization: Organization) => {
    setDeleting(organization);
    setDeleteOpen(true);
  };

  const sorted = useMemo(
    () => [...organizations].sort((a, b) => a.name.localeCompare(b.name, 'ru')),
    [organizations]
  );

  const editValues = useMemo<OrganizationFormValues | undefined>(
    () => (editing ? { name: editing.name, description: editing.description ?? '' } : undefined),
    [editing]
  );

  const handleSubmit = async (values: OrganizationFormValues): Promise<boolean> => {
    const result = !editing
      ? await createOrganization(workspaceId, {
          name: values.name,
          description: values.description || undefined,
          organizationStatus: 'ACTIVE',
        })
      : await updateOrganization(workspaceId, editing.uuid, {
          name: values.name,
          // null очищает описание, undefined оставил бы старое
          description: values.description || null,
        });

    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar(
        !editing ? 'Не удалось создать организацию' : 'Не удалось сохранить организацию',
        { variant: 'error' }
      );
      return false;
    }
    enqueueSnackbar(!editing ? 'Организация создана' : 'Изменения сохранены', {
      variant: 'success',
    });
    router.refresh();
    return true;
  };

  const handleDelete = async (): Promise<boolean> => {
    if (!deleting) return false;
    const result = await deleteOrganization(workspaceId, deleting.uuid);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить организацию', { variant: 'error' });
      return false;
    }
    enqueueSnackbar('Организация удалена', { variant: 'success' });
    router.refresh();
    return true;
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h4">Организации</Typography>
          <Typography variant="body2" color="text.secondary">
            Компании, от имени которых вы ведёте объекты. Проекты и их сметы создаются внутри
            организации.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
          sx={{ flexShrink: 0 }}
        >
          Создать организацию
        </Button>
      </Stack>

      {sorted.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Пока нет ни одной организации
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Создайте организацию — например, свою компанию. После этого в ней можно завести проект
              (объект заказчика) и составить для него смету.
            </Typography>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={openCreate}>
              Создать организацию
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' },
          }}
        >
          {sorted.map((organization) => {
            const projectsCount = organization.projects?.length ?? 0;
            return (
              <Card key={organization.uuid} sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Typography variant="h6" sx={{ flexGrow: 1, wordBreak: 'break-word' }}>
                      {organization.name}
                    </Typography>
                    <Tooltip title="Изменить">
                      <IconButton
                        size="small"
                        aria-label={`Изменить организацию «${organization.name}»`}
                        onClick={() => openEdit(organization)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton
                        size="small"
                        aria-label={`Удалить организацию «${organization.name}»`}
                        onClick={() => openDelete(organization)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, whiteSpace: 'pre-line', wordBreak: 'break-word' }}
                  >
                    {organization.description || 'Без описания'}
                  </Typography>
                </CardContent>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ px: 3, pb: 2.5 }}
                >
                  <Link
                    component={NextLink}
                    href={`${paths.dashboard.projects}?organization=${organization.uuid}`}
                    variant="subtitle2"
                  >
                    {projectsCount > 0
                      ? pluralize(projectsCount, ['проект', 'проекта', 'проектов'])
                      : 'Нет проектов'}
                  </Link>
                  <Typography variant="caption" color="text.secondary">
                    {`Руководитель: ${[organization.organizationLeader.firstName, organization.organizationLeader.secondName].filter(Boolean).join(' ')}`}
                  </Typography>
                </Stack>
              </Card>
            );
          })}
        </Box>
      )}

      <OrganizationFormDialog
        open={formOpen}
        initialValues={editValues}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <CascadeDeleteDialog
        open={deleteOpen}
        workspaceId={workspaceId}
        entityLabel="организацию"
        entityName={deleting?.name ?? ''}
        projectIds={deleting?.projects?.map((project) => project.uuid) ?? []}
        showProjectsCount
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
