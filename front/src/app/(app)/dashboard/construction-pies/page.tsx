import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllConstructionPies } from 'src/api/actions/construction-pie/get-all-pies.action';
import { getAllMaterialsInHandbook } from 'src/api/actions/material/get-all-materials-in-handbook.action';
import { getAllFieldUnitMeasurementsOfHandbook } from 'src/api/actions/field-unit-measurement/get-all-field-unit-measurements-of-handbook.action';

import { Error } from 'src/shared/error/error';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { ConstructionPiesList } from 'src/widgets/construction-pies/construction-pies-list';
import { ConstructionPieWithLayers } from 'src/shared/contracts/construction-pie';
import { UnitMeasurementOption } from 'src/shared/unit-measurement-select';

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

  const [piesRes, materialsRes, unitsRes] = await Promise.all([
    getAllConstructionPies(workspaceId, handbookId),
    getAllMaterialsInHandbook(workspaceId, handbookId),
    getAllFieldUnitMeasurementsOfHandbook(workspaceId, handbookId),
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
  const unitMeasurements: UnitMeasurementOption[] =
    unitsRes && !isErrorFieldTypeGuard(unitsRes)
      ? (unitsRes as unknown as Array<{ uuid: string; name: string }>).map((unit) => ({
          uuid: unit.uuid,
          name: unit.name,
        }))
      : [];

  return (
    <ConstructionPiesList
      workspaceId={workspaceId}
      handbookId={handbookId}
      pies={pies}
      materials={materials}
      unitMeasurements={unitMeasurements}
    />
  );
}
