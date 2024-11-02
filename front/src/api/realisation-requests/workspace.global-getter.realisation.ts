'use server';

import { WorkspaceGetCommand, UserGetFullInfoCommand } from '@numart/house-admin-contracts';
import { getAllGlobalCategories } from '@/api/actions/global-category/get-all-global-category.action';
import { getAllFieldVariantsInHandbook } from '@/api/actions/field-variants/get-all-field-variants-in-handbook.action';

import { isErrorInArrayFieldTypeGuard } from 'src/utils/type-guards/are-error-in-array-of-fields.type-guard';

import { AppState } from 'src/api/realisation-requests/app-state.type';
import { getAppInfo } from 'src/api/actions/app-info/get-app-info.action';
import { getAllFieldTypes } from 'src/api/actions/field-type/get-all-field-types.action';
import { getCurrentHandbook } from 'src/api/actions/handbook/get-current-handbook.action';
import { getCurrentWorkspace } from 'src/api/actions/workspace/get-current-workspace.action';
import { getAllCategoryMaterialOfHandbook } from 'src/api/actions/category-material/get-all-category-material-of-handbook.action';
import { getAllFieldOfCategoryOfHandbook } from 'src/api/actions/field-category-material/get-all-field-category-material-of-handbook.action';
import { getAllFieldUnitMeasurementsOfHandbook } from 'src/api/actions/field-unit-measurement/get-all-field-unit-measurements-of-handbook.action';

export async function getFullWorkspaceInfo(currentUserInfo: UserGetFullInfoCommand.ResponseEntity) {
  const currentWorkspace = (currentUserInfo?.creatorOfWorkspace ||
    (currentUserInfo?.memberOfWorkspaces &&
      currentUserInfo?.memberOfWorkspaces[0])) as unknown as WorkspaceGetCommand.ResponseEntity;
  const workspaceId = currentWorkspace.uuid;
  const handbookId = currentWorkspace.handbookOfWorkspaceUuid as string;

  const appInfo = await getAppInfo();

  const currentWorkspaceInfo = await getCurrentWorkspace(workspaceId);
  const currentHandbookInfo = await getCurrentHandbook(workspaceId, handbookId);
  const allCategoryMaterialsOfHandbook = await getAllCategoryMaterialOfHandbook(
    workspaceId,
    handbookId
  );
  const allFieldsOfCategoryMaterialsOfHandbook = await getAllFieldOfCategoryOfHandbook(
    workspaceId,
    handbookId
  );
  const allFieldsUnitMeasurementsOfHandbook = await getAllFieldUnitMeasurementsOfHandbook(
    workspaceId,
    handbookId
  );
  const allGlobalCategories = await getAllGlobalCategories();
  const allFieldTypes = await getAllFieldTypes();
  const allFieldsVariantsOfHandbook = await getAllFieldVariantsInHandbook(workspaceId, handbookId);

  if (
    !isErrorInArrayFieldTypeGuard([
      appInfo,
      currentWorkspaceInfo,
      currentHandbookInfo,
      allCategoryMaterialsOfHandbook,
      allFieldsOfCategoryMaterialsOfHandbook,
      allFieldsUnitMeasurementsOfHandbook,
      allGlobalCategories,
      allFieldTypes,
      allFieldsVariantsOfHandbook,
    ])
  ) {
    const appState: AppState = {
      appInfo,
      currentWorkspaceInfo,
      currentHandbookInfo,
      allCategoryMaterialsOfHandbook,
      allFieldsOfCategoryMaterialsOfHandbook,
      allFieldsUnitMeasurementsOfHandbook,
      allGlobalCategories,
      allFieldTypes,
      allFieldsVariantsOfHandbook,
      error: false,
    };
    return appState;
  }
  const appState: AppState = {
    appInfo,
    currentWorkspaceInfo,
    currentHandbookInfo,
    allCategoryMaterialsOfHandbook,
    allFieldsOfCategoryMaterialsOfHandbook,
    allFieldsUnitMeasurementsOfHandbook,
    allGlobalCategories,
    allFieldTypes,
    allFieldsVariantsOfHandbook,
    error: true,
  };

  return appState;
}
