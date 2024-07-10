// ----------------------------------------------------------------------

import Materials from '@/widgets/materials/materials';
import {
  WorkspaceGetCommand,
  MaterialGetAllCommand,
  UserGetFullInfoCommand,
  ResponsiblePartnerProducerGetAllCommand,
} from '@numart/house-admin-contracts';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { Error } from 'src/shared/error/error';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllMaterialsInHandbook } from 'src/api/actions/material/get-all-materials-in-handbook.action';
import { getAllResponsiblePartnersProducersInHandbook } from 'src/api/actions/responsible-partner-producer/get-all-responsible-partners-producers-in-handbook.action';

export const metadata = {
  title: 'Dashboard: DashboardMain',
};

export default async function MaterialsPage() {
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;

  const workspaceToSearch = (currentUser.memberOfWorkspace ||
    currentUser.creatorOfWorkspace) as WorkspaceGetCommand.ResponseEntity;
  const handbookToSearch = workspaceToSearch?.handbookOfWorkspaceUuid as string;

  let allMaterialsInCurrentHandbook = await getAllMaterialsInHandbook(
    workspaceToSearch.uuid,
    handbookToSearch
  );

  if (!isErrorFieldTypeGuard(allMaterialsInCurrentHandbook)) {
    allMaterialsInCurrentHandbook =
      allMaterialsInCurrentHandbook as MaterialGetAllCommand.ResponseEntity;
  }

  let allResponsiblePartnerProducersInCurrentHandbook =
    await getAllResponsiblePartnersProducersInHandbook(workspaceToSearch.uuid, handbookToSearch);

  if (!isErrorFieldTypeGuard(allResponsiblePartnerProducersInCurrentHandbook)) {
    allResponsiblePartnerProducersInCurrentHandbook =
      allResponsiblePartnerProducersInCurrentHandbook as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
  }

  return isErrorFieldTypeGuard(allMaterialsInCurrentHandbook) ||
    isErrorFieldTypeGuard(allResponsiblePartnerProducersInCurrentHandbook) ? (
    <Error />
  ) : (
    <Materials
      materialsInfo={allMaterialsInCurrentHandbook}
      responsibleProducers={allResponsiblePartnerProducersInCurrentHandbook}
    />
  );
}
