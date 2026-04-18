import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllConstructionPies } from 'src/api/actions/construction-pie/get-all-pies.action';
import { getAllMaterialsInHandbook } from 'src/api/actions/material/get-all-materials-in-handbook.action';

import { Error } from 'src/shared/error/error';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { ConstructionPiesList } from 'src/widgets/construction-pies/construction-pies-list';
import { ConstructionPieWithLayers } from 'src/shared/contracts/construction-pie';

export const metadata = {
  title: 'Dashboard: Пироги',
};

export default async function ConstructionPiesPage() {
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;

  const workspaceId = ((currentUser.memberOfWorkspaces && currentUser.memberOfWorkspaces[0]?.uuid) ||
    currentUser.creatorOfWorkspaceUuid) as string;
  const handbookId = ((currentUser.memberOfWorkspaces &&
    currentUser.memberOfWorkspaces.length > 0 &&
    currentUser.memberOfWorkspaces[0].handbookOfWorkspaceUuid) ||
    currentUser.creatorOfWorkspace?.handbookOfWorkspaceUuid) as string;

  if (!workspaceId || !handbookId) return <Error />;

  const [piesRes, materialsRes] = await Promise.all([
    getAllConstructionPies(workspaceId, handbookId),
    getAllMaterialsInHandbook(workspaceId, handbookId),
  ]);

  if (isErrorFieldTypeGuard(piesRes)) return <Error />;
  const pies = piesRes as ConstructionPieWithLayers[];
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
    <ConstructionPiesList
      workspaceId={workspaceId}
      handbookId={handbookId}
      pies={pies}
      materials={materials}
    />
  );
}
