import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllUnitTemplates } from 'src/api/actions/unit-template/get-all-unit-templates.action';
import { getAllMaterialsInHandbook } from 'src/api/actions/material/get-all-materials-in-handbook.action';

import { Error } from 'src/shared/error/error';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { UnitTemplatesList } from 'src/widgets/unit-templates/unit-templates-list';
import { UnitTemplateWithComponents } from 'src/shared/contracts/unit-template';

export const metadata = {
  title: 'Dashboard: Единички',
};

export default async function UnitTemplatesPage() {
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;

  const workspaceId = ((currentUser.memberOfWorkspaces && currentUser.memberOfWorkspaces[0]?.uuid) ||
    currentUser.creatorOfWorkspaceUuid) as string;
  const handbookId = ((currentUser.memberOfWorkspaces &&
    currentUser.memberOfWorkspaces.length > 0 &&
    currentUser.memberOfWorkspaces[0].handbookOfWorkspaceUuid) ||
    currentUser.creatorOfWorkspace?.handbookOfWorkspaceUuid) as string;

  if (!workspaceId || !handbookId) return <Error />;

  const [templatesRes, materialsRes] = await Promise.all([
    getAllUnitTemplates(workspaceId, handbookId),
    getAllMaterialsInHandbook(workspaceId, handbookId),
  ]);

  if (isErrorFieldTypeGuard(templatesRes)) return <Error />;
  const templates = templatesRes as UnitTemplateWithComponents[];
  const materials =
    materialsRes && !isErrorFieldTypeGuard(materialsRes)
      ? (materialsRes as unknown as Array<{
          uuid: string;
          name: string;
          price?: number | null;
          unitMeasurement?: { name: string } | null;
        }>)
      : [];

  return (
    <UnitTemplatesList
      workspaceId={workspaceId}
      handbookId={handbookId}
      templates={templates}
      materials={materials}
    />
  );
}
