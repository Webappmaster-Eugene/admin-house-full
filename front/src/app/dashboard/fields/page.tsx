// ----------------------------------------------------------------------

import { getAllFieldOfCategoryOfHandbook } from '@/api/actions/project/get-all-projects-of-workspace.action';
import {
  UserGetFullInfoCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { Error } from 'src/shared/error/error';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';

export const metadata = {
  title: 'Dashboard: fields of category-materials',
};

export default async function FieldsOfCategoryMaterialsPage() {
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;

  const workspaceToSearchUuid = ((currentUser.memberOfWorkspaces &&
    currentUser.memberOfWorkspaces[0]?.uuid) ||
    currentUser.creatorOfWorkspaceUuid) as string;

  const handbookToSearchUuid = ((currentUser?.memberOfWorkspaces &&
    currentUser?.memberOfWorkspaces.length > 0 &&
    currentUser?.memberOfWorkspaces[0].handbookOfWorkspaceUuid) ||
    currentUser?.creatorOfWorkspace?.handbookOfWorkspaceUuid) as string;

  let allFieldsInCurrentHandbook = await getAllFieldOfCategoryOfHandbook(
    workspaceToSearchUuid,
    handbookToSearchUuid
  );

  if (!isErrorFieldTypeGuard(allFieldsInCurrentHandbook)) {
    allFieldsInCurrentHandbook =
      allFieldsInCurrentHandbook as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
  }

  return isErrorFieldTypeGuard(allFieldsInCurrentHandbook) ? (
    <Error />
  ) : (
    <Error />
    // <FieldsOfCategoryMaterials fieldsOfCategoryMaterialsInfo={allFieldsInCurrentHandbook} />
  );
}
