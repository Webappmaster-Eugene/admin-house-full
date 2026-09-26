import { UserGetFullInfoCommand, ProjectGetAllCommand } from '@numart/house-admin-contracts';

import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllProjectsOfWorkspace } from 'src/api/actions/project/get-all-projects-of-workspace.action';
import { getAllEstimatesInProject } from 'src/api/actions/estimate/get-all-estimates-in-project.action';

import { Error } from 'src/shared/error/error';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { EstimatesList } from 'src/widgets/estimates/estimates-list';
import { EstimateBusinessValue } from 'src/shared/contracts/estimate';

export const metadata = {
  title: 'Dashboard: Сметы',
};

export default async function EstimatesPage() {
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;

  const workspaceId = ((currentUser.memberOfWorkspaces && currentUser.memberOfWorkspaces[0]?.uuid) ||
    currentUser.creatorOfWorkspaceUuid) as string;

  if (!workspaceId) {
    return <Error />;
  }

  const projectsResult = await getAllProjectsOfWorkspace(workspaceId);
  if (isErrorFieldTypeGuard(projectsResult)) {
    return <Error />;
  }
  const projects = projectsResult as ProjectGetAllCommand.ResponseEntity;

  const estimatesPerProject = await Promise.all(
    projects.map(async (project) => {
      const res = await getAllEstimatesInProject(workspaceId, project.uuid);
      if (isErrorFieldTypeGuard(res)) {
        return { project, estimates: [] as EstimateBusinessValue[] };
      }
      return { project, estimates: res as EstimateBusinessValue[] };
    })
  );

  return (
    <EstimatesList
      workspaceId={workspaceId}
      estimatesPerProject={estimatesPerProject}
    />
  );
}
