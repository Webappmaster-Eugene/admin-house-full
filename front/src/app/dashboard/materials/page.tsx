// ----------------------------------------------------------------------

import Materials from '@/widgets/materials/materials';
import { MaterialGetAllCommand, UserGetFullInfoCommand } from '@/../../back/libs/contracts';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { Error } from 'src/shared/error/error';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllMaterialsInHandbook } from 'src/api/actions/material/get-all-materials-in-handbook.action';

export const metadata = {
  title: 'Dashboard: materials',
};

export default async function MaterialsPage() {
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;

  const workspaceToSearchUuid = (currentUser.memberOfWorkspaceUuid ||
    currentUser.creatorOfWorkspaceUuid) as string;
  const handbookToSearchUuid = (currentUser.memberOfWorkspace?.handbookOfWorkspaceUuid ||
    currentUser.creatorOfWorkspace?.handbookOfWorkspaceUuid) as string;

  let allMaterialsInCurrentHandbook = await getAllMaterialsInHandbook(
    workspaceToSearchUuid,
    handbookToSearchUuid
  );

  if (!isErrorFieldTypeGuard(allMaterialsInCurrentHandbook)) {
    allMaterialsInCurrentHandbook =
      allMaterialsInCurrentHandbook as MaterialGetAllCommand.ResponseEntity;
  }

  // let allResponsiblePartnerProducersInCurrentHandbook =
  //   await getAllResponsiblePartnersProducersInHandbook(workspaceToSearchUuid, handbookToSearchUuid);

  // if (!isErrorFieldTypeGuard(allResponsiblePartnerProducersInCurrentHandbook)) {
  //   allResponsiblePartnerProducersInCurrentHandbook =
  //     allResponsiblePartnerProducersInCurrentHandbook as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
  // }

  return isErrorFieldTypeGuard(allMaterialsInCurrentHandbook) ? (
    <Error />
  ) : (
    <Materials materialsInfo={allMaterialsInCurrentHandbook} />
  );
}
