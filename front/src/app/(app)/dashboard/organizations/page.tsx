import { UserGetFullInfoCommand, OrganizationGetAllCommand } from '@numart/house-admin-contracts';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { Error } from 'src/shared/error/error';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { OrganizationsList } from 'src/widgets/organizations/organizations-list';
import { getAllOrganizationsOfWorkspace } from 'src/api/actions/organization/get-all-organizations-of-workspace.action';

export const metadata = {
  title: 'Dashboard: Организации',
};

export default async function OrganizationsPage() {
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

  const organizationsResult = await getAllOrganizationsOfWorkspace(workspaceId);
  if (isErrorFieldTypeGuard(organizationsResult)) {
    return <Error />;
  }

  return (
    <OrganizationsList
      workspaceId={workspaceId}
      organizations={organizationsResult as OrganizationGetAllCommand.ResponseEntity}
    />
  );
}
