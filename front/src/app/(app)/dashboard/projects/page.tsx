import {
  ProjectGetAllCommand,
  UserGetFullInfoCommand,
  OrganizationGetAllCommand,
} from '@numart/house-admin-contracts';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { Error } from 'src/shared/error/error';
import { ProjectsList } from 'src/widgets/projects/projects-list';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllProjectsOfWorkspace } from 'src/api/actions/project/get-all-projects-of-workspace.action';
import { getAllOrganizationsOfWorkspace } from 'src/api/actions/organization/get-all-organizations-of-workspace.action';

export const metadata = {
  title: 'Dashboard: Проекты',
};

interface ProjectsPageProps {
  searchParams: { organization?: string | string[] };
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const currentUser = await getCurrentUser();
  if (isErrorFieldTypeGuard(currentUser)) {
    return <Error />;
  }
  const user = currentUser as UserGetFullInfoCommand.ResponseEntity;

  // Сначала свой workspace: создание, правка и удаление доступны только его создателю.
  const workspaceId =
    user.creatorOfWorkspaceUuid || (user.memberOfWorkspaces && user.memberOfWorkspaces[0]?.uuid);
  if (!workspaceId) {
    return <Error />;
  }

  const [organizationsResult, projectsResult] = await Promise.all([
    getAllOrganizationsOfWorkspace(workspaceId),
    getAllProjectsOfWorkspace(workspaceId),
  ]);
  if (isErrorFieldTypeGuard(organizationsResult) || isErrorFieldTypeGuard(projectsResult)) {
    return <Error />;
  }

  const organizations = organizationsResult as OrganizationGetAllCommand.ResponseEntity;
  // Фильтр из ссылки «N проектов» на странице организаций; неизвестный id игнорируем.
  const requestedOrganization = Array.isArray(searchParams.organization)
    ? searchParams.organization[0]
    : searchParams.organization;
  const initialOrganizationFilter = organizations.some(
    (organization) => organization.uuid === requestedOrganization
  )
    ? (requestedOrganization as string)
    : '';

  return (
    <ProjectsList
      workspaceId={workspaceId}
      organizations={organizations}
      projects={projectsResult as ProjectGetAllCommand.ResponseEntity}
      initialOrganizationFilter={initialOrganizationFilter}
    />
  );
}
