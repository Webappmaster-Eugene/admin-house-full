'use client';

import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectGetAllCommand, OrganizationGetAllCommand } from '@numart/house-admin-contracts';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  Link,
  Table,
  Stack,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  Typography,
  CardContent,
  TableContainer,
} from '@mui/material';

import { paths } from 'src/utils/routes/paths';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { GuideInfoAlert } from 'src/widgets/guide/guide-info-alert';
import { createProject } from 'src/api/actions/project/create-project.action';
import { updateProject } from 'src/api/actions/project/update-project.action';
import { deleteProject } from 'src/api/actions/project/delete-project.action';
import { CascadeDeleteDialog } from 'src/widgets/organizations/cascade-delete-dialog';

import { ProjectFormDialog, ProjectFormValues } from './project-form-dialog';

// ----------------------------------------------------------------------

type Project = ProjectGetAllCommand.ResponseEntity[number];

interface ProjectsListProps {
  workspaceId: string;
  organizations: OrganizationGetAllCommand.ResponseEntity;
  projects: ProjectGetAllCommand.ResponseEntity;
  /** uuid организации из ?organization= или '' — все */
  initialOrganizationFilter: string;
}

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export function ProjectsList({
  workspaceId,
  organizations,
  projects,
  initialOrganizationFilter,
}: ProjectsListProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [organizationFilter, setOrganizationFilter] = useState(initialOrganizationFilter);
  // Флаг открытия отдельно от цели: при закрытии цель живёт до конца анимации, заголовок не мигает.
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<Project | null>(null);

  const organizationOptions = useMemo(
    () =>
      [...organizations]
        .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
        .map(({ uuid, name }) => ({ uuid, name })),
    [organizations]
  );

  const visibleProjects = useMemo(
    () =>
      projects
        .filter((project) => !organizationFilter || project.organizationUuid === organizationFilter)
        // Свежие сверху: с ними работают чаще.
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [projects, organizationFilter]
  );

  const editValues = useMemo<ProjectFormValues | undefined>(
    () =>
      editing
        ? {
            organizationUuid: editing.organizationUuid,
            name: editing.name,
            description: editing.description ?? '',
            customerMail: editing.customerMail ?? '',
          }
        : undefined,
    [editing]
  );

  const handleFilterChange = (value: string) => {
    setOrganizationFilter(value);
    // Фильтр в адресе: ссылкой можно поделиться, «назад» возвращает к нему.
    router.replace(
      value ? `${paths.dashboard.projects}?organization=${value}` : paths.dashboard.projects,
      {
        scroll: false,
      }
    );
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (project: Project) => {
    setEditing(project);
    setFormOpen(true);
  };
  const openDelete = (project: Project) => {
    setDeleting(project);
    setDeleteOpen(true);
  };

  const handleSubmit = async (values: ProjectFormValues): Promise<boolean> => {
    const result = !editing
      ? await createProject(workspaceId, values.organizationUuid, {
          name: values.name,
          description: values.description || undefined,
          customerMail: values.customerMail || undefined,
          projectStatus: 'ACTIVE',
        })
      : await updateProject(workspaceId, editing.organizationUuid, editing.uuid, {
          name: values.name,
          // null очищает поле, undefined оставил бы старое значение
          description: values.description || null,
          customerMail: values.customerMail || null,
          ...(values.organizationUuid !== editing.organizationUuid && {
            organizationUuid: values.organizationUuid,
          }),
        });

    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar(!editing ? 'Не удалось создать проект' : 'Не удалось сохранить проект', {
        variant: 'error',
      });
      return false;
    }
    enqueueSnackbar(!editing ? 'Проект создан' : 'Изменения сохранены', { variant: 'success' });
    router.refresh();
    return true;
  };

  const handleDelete = async (): Promise<boolean> => {
    if (!deleting) return false;
    const result = await deleteProject(workspaceId, deleting.organizationUuid, deleting.uuid);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить проект', { variant: 'error' });
      return false;
    }
    enqueueSnackbar('Проект удалён', { variant: 'success' });
    router.refresh();
    return true;
  };

  const hasOrganizations = organizations.length > 0;

  // Одни и те же действия в строке таблицы (десктоп) и в карточке (телефон)
  const renderActions = (project: Project) => (
    <>
      <Link component={NextLink} href={paths.dashboard.estimates} variant="body2" sx={{ mr: 1 }}>
        Сметы
      </Link>
      <Tooltip title="Изменить">
        <IconButton
          size="small"
          aria-label={`Изменить проект «${project.name}»`}
          onClick={() => openEdit(project)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Удалить">
        <IconButton
          size="small"
          aria-label={`Удалить проект «${project.name}»`}
          onClick={() => openDelete(project)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Box>
      <GuideInfoAlert section="organizations" />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h4">Проекты</Typography>
          <Typography variant="body2" color="text.secondary">
            Объекты заказчиков. Каждый проект принадлежит организации, в нём составляются сметы.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
          disabled={!hasOrganizations}
          sx={{ flexShrink: 0 }}
        >
          Создать проект
        </Button>
      </Stack>

      {!hasOrganizations && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Сначала создайте организацию
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Проект всегда относится к организации — например, к вашей компании.
            </Typography>
            <Button component={NextLink} href={paths.dashboard.organizations} variant="outlined">
              Перейти к организациям
            </Button>
          </CardContent>
        </Card>
      )}

      {hasOrganizations && (
        <Card>
          <Stack direction="row" sx={{ p: 2.5 }}>
            <TextField
              select
              size="small"
              label="Организация"
              value={organizationFilter}
              onChange={(event) => handleFilterChange(event.target.value)}
              // Без displayEmpty пункт «Все организации» (value '') не отображается в поле
              SelectProps={{ displayEmpty: true }}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: { xs: 1, sm: 280 } }}
            >
              <MenuItem value="">Все организации</MenuItem>
              {organizationOptions.map((organization) => (
                <MenuItem key={organization.uuid} value={organization.uuid}>
                  {organization.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          {visibleProjects.length === 0 ? (
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {organizationFilter
                  ? 'В этой организации пока нет проектов.'
                  : 'Пока нет ни одного проекта. Создайте проект — и в нём можно будет составить смету.'}
              </Typography>
              <Button variant="outlined" startIcon={<AddIcon />} onClick={openCreate}>
                Создать проект
              </Button>
            </CardContent>
          ) : (
            <>
              <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
                <Table sx={{ minWidth: 720 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Проект</TableCell>
                      <TableCell>Организация</TableCell>
                      <TableCell>Email заказчика</TableCell>
                      <TableCell>Изменён</TableCell>
                      <TableCell align="right">Действия</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visibleProjects.map((project) => (
                      <TableRow key={project.uuid} hover>
                        <TableCell sx={{ maxWidth: 360 }}>
                          <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                            {project.name}
                          </Typography>
                          {project.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {project.description}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>{project.organization.name}</TableCell>
                        <TableCell sx={{ wordBreak: 'break-all' }}>
                          {project.customerMail || '—'}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {dateFormatter.format(new Date(project.updatedAt))}
                        </TableCell>
                        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                          {renderActions(project)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* На узком экране таблица в 5 колонок нечитаема — те же данные карточками */}
              <Stack divider={<Divider />} sx={{ display: { xs: 'flex', md: 'none' } }}>
                {visibleProjects.map((project) => (
                  <Box key={project.uuid} sx={{ px: 2.5, py: 2 }}>
                    <Typography variant="subtitle1" sx={{ wordBreak: 'break-word' }}>
                      {project.name}
                    </Typography>
                    {project.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5, wordBreak: 'break-word' }}
                      >
                        {project.description}
                      </Typography>
                    )}
                    <Box
                      component="dl"
                      sx={{
                        m: 0,
                        mt: 1.5,
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        columnGap: 1.5,
                        rowGap: 0.5,
                        typography: 'body2',
                        '& dt': { color: 'text.secondary' },
                        '& dd': { m: 0, minWidth: 0, wordBreak: 'break-word' },
                      }}
                    >
                      <dt>Организация</dt>
                      <dd>{project.organization.name}</dd>
                      <dt>Заказчик</dt>
                      <dd>{project.customerMail || '—'}</dd>
                      <dt>Изменён</dt>
                      <dd>{dateFormatter.format(new Date(project.updatedAt))}</dd>
                    </Box>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-end"
                      sx={{ mt: 1 }}
                    >
                      {renderActions(project)}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </>
          )}
        </Card>
      )}

      <ProjectFormDialog
        open={formOpen}
        organizations={organizationOptions}
        defaultOrganizationUuid={organizationFilter || organizationOptions[0]?.uuid || ''}
        initialValues={editValues}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <CascadeDeleteDialog
        open={deleteOpen}
        workspaceId={workspaceId}
        entityLabel="проект"
        entityName={deleting?.name ?? ''}
        projectIds={deleting ? [deleting.uuid] : []}
        showProjectsCount={false}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
