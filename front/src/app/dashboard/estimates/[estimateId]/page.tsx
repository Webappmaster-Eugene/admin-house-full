import { UserGetFullInfoCommand, ProjectGetAllCommand } from '@numart/house-admin-contracts';

import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllProjectsOfWorkspace } from 'src/api/actions/project/get-all-projects-of-workspace.action';
import { getEstimate } from 'src/api/actions/estimate/get-estimate.action';
import { getAllMaterialsInHandbook } from 'src/api/actions/material/get-all-materials-in-handbook.action';
import { getAllUnitTemplates } from 'src/api/actions/unit-template/get-all-unit-templates.action';

import { Error } from 'src/shared/error/error';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { EstimateEditor } from 'src/widgets/estimates/estimate-editor';
import { EstimateFull } from 'src/shared/contracts/estimate';
import { UnitTemplateWithComponents } from 'src/shared/contracts/unit-template';

export const metadata = {
  title: 'Dashboard: Редактор сметы',
};

export default async function EstimatePage({ params }: { params: { estimateId: string } }) {
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;
  const workspaceId = ((currentUser.memberOfWorkspaces && currentUser.memberOfWorkspaces[0]?.uuid) ||
    currentUser.creatorOfWorkspaceUuid) as string;
  const handbookId = ((currentUser.memberOfWorkspaces &&
    currentUser.memberOfWorkspaces.length > 0 &&
    currentUser.memberOfWorkspaces[0].handbookOfWorkspaceUuid) ||
    currentUser.creatorOfWorkspace?.handbookOfWorkspaceUuid) as string;

  if (!workspaceId) return <Error />;

  const projectsResult = await getAllProjectsOfWorkspace(workspaceId);
  if (isErrorFieldTypeGuard(projectsResult)) return <Error />;
  const projects = projectsResult as ProjectGetAllCommand.ResponseEntity;

  // Находим, в каком проекте лежит эта смета — опрашиваем все проекты параллельно
  const attempts = await Promise.all(
    projects.map(async (project) => {
      const res = await getEstimate(workspaceId, project.uuid, params.estimateId);
      return { projectUuid: project.uuid, res };
    })
  );
  const hit = attempts.find((attempt) => !isErrorFieldTypeGuard(attempt.res));
  if (!hit) return <Error />;
  const projectId = hit.projectUuid;
  const estimateTree = hit.res;

  const [materialsResult, templatesResult] = handbookId
    ? await Promise.all([
        getAllMaterialsInHandbook(workspaceId, handbookId),
        getAllUnitTemplates(workspaceId, handbookId),
      ])
    : [null, null];

  const materials =
    materialsResult && !isErrorFieldTypeGuard(materialsResult)
      ? (materialsResult as unknown as Array<{
          uuid: string;
          name: string;
          price?: number | null;
          unitMeasurement?: { name: string } | null;
        }>)
      : [];

  const unitTemplates =
    templatesResult && !isErrorFieldTypeGuard(templatesResult)
      ? (templatesResult as UnitTemplateWithComponents[])
      : [];

  return (
    <EstimateEditor
      workspaceId={workspaceId}
      projectId={projectId}
      estimate={estimateTree as EstimateFull}
      materials={materials}
      unitTemplates={unitTemplates}
    />
  );
}
