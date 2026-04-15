import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { Error } from 'src/shared/error/error';
import DashboardMain from 'src/widgets/dashboard-main/dashboard-main';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllMaterialsInHandbook } from 'src/api/actions/material/get-all-materials-in-handbook.action';
import { getAllCategoryMaterialOfHandbook } from 'src/api/actions/category-material/get-all-category-material-of-handbook.action';
import { getAllFieldOfCategoryOfHandbook } from 'src/api/actions/field-category-material/get-all-field-category-material-of-handbook.action';

export const metadata = {
  title: 'Dashboard: Main Page',
};

const safeCount = (result: unknown): number | null => {
  if (isErrorFieldTypeGuard(result)) return null;
  if (Array.isArray(result)) return result.length;
  return null;
};

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (isErrorFieldTypeGuard(currentUser)) {
    return <Error />;
  }

  const user = currentUser as UserGetFullInfoCommand.ResponseEntity;

  const workspaceId =
    user.creatorOfWorkspaceUuid ||
    (user.memberOfWorkspaces && user.memberOfWorkspaces[0]?.uuid) ||
    null;

  const handbookId =
    user.creatorOfWorkspace?.handbookOfWorkspaceUuid ||
    (user.memberOfWorkspaces && user.memberOfWorkspaces[0]?.handbookOfWorkspaceUuid) ||
    null;

  let stats: { materials: number | null; categories: number | null; fields: number | null } = {
    materials: null,
    categories: null,
    fields: null,
  };

  if (workspaceId && handbookId) {
    const [materialsRes, categoriesRes, fieldsRes] = await Promise.all([
      getAllMaterialsInHandbook(workspaceId, handbookId),
      getAllCategoryMaterialOfHandbook(workspaceId, handbookId),
      getAllFieldOfCategoryOfHandbook(workspaceId, handbookId),
    ]);

    stats = {
      materials: safeCount(materialsRes),
      categories: safeCount(categoriesRes),
      fields: safeCount(fieldsRes),
    };
  }

  return <DashboardMain currentUser={user} stats={stats} />;
}
