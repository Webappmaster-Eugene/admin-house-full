import {
  MaterialGetAllCommand,
  UserGetFullInfoCommand,
  CategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import CategoryMaterials from 'src/widgets/categories/category-materials/category-materials';
import { getAllMaterialsInHandbook } from 'src/api/actions/material/get-all-materials-in-handbook.action';
import { CategoryMaterialProps } from 'src/widgets/categories/category-materials/category-materials.props';
import { getAllCategoryMaterialOfHandbook } from 'src/api/actions/category-material/get-all-category-material-of-handbook.action';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Дэшборд: категории материалов',
};

export default async function Page() {
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;

  const workspaceToSearchUuid = ((currentUser.memberOfWorkspaces &&
    currentUser.memberOfWorkspaces[0]?.uuid) ||
    currentUser.creatorOfWorkspaceUuid) as string;

  const handbookToSearchUuid = ((currentUser?.memberOfWorkspaces &&
    currentUser?.memberOfWorkspaces.length > 0 &&
    currentUser?.memberOfWorkspaces[0].handbookOfWorkspaceUuid) ||
    currentUser?.creatorOfWorkspace?.handbookOfWorkspaceUuid) as string;

  let allCategoriesInCurrentHandbook = await getAllCategoryMaterialOfHandbook(
    workspaceToSearchUuid,
    handbookToSearchUuid
  );

  let allMaterialsInCurrentHandbook = await getAllMaterialsInHandbook(
    workspaceToSearchUuid,
    handbookToSearchUuid
  );

  if (!isErrorFieldTypeGuard(allMaterialsInCurrentHandbook)) {
    allMaterialsInCurrentHandbook =
      allMaterialsInCurrentHandbook as MaterialGetAllCommand.ResponseEntity;
  }

  if (!isErrorFieldTypeGuard(allCategoriesInCurrentHandbook)) {
    allCategoriesInCurrentHandbook =
      allCategoriesInCurrentHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
  }

  const dataForWork: CategoryMaterialProps = {
    allCategoriesInWorkspace:
      allCategoriesInCurrentHandbook as CategoryMaterialGetAllCommand.ResponseEntity,
    materials: allMaterialsInCurrentHandbook as MaterialGetAllCommand.ResponseEntity,
  };

  return <CategoryMaterials {...dataForWork} />;
}
