'use server';

import { WorkspaceGetCommand, UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { isErrorInArrayFieldTypeGuard } from 'src/utils/type-guards/are-error-in-array-of-fields.type-guard';

import { AppState } from 'src/api/realisation-requests/app-state.type';
import { getAppInfo } from 'src/api/actions/app-info/get-app-info.action';
import { getAllFieldTypes } from 'src/api/actions/field-type/get-all-field-types.action';
import { getCurrentHandbook } from 'src/api/actions/handbook/get-current-handbook.action';
import { getCurrentWorkspace } from 'src/api/actions/workspace/get-current-workspace.action';
import { getAllGlobalCategories } from 'src/api/actions/global-category/get-all-global-category.action';
import { getAllCategoryMaterialOfHandbook } from 'src/api/actions/category-material/get-all-category-material-of-handbook.action';
import { getAllFieldOfCategoryOfHandbook } from 'src/api/actions/field-category-material/get-all-field-category-material-of-handbook.action';

export async function getFullWorkspaceInfo(currentUserInfo: UserGetFullInfoCommand.ResponseEntity) {
  const currentWorkspace = (currentUserInfo.creatorOfWorkspace ||
    currentUserInfo.memberOfWorkspaceUuid) as WorkspaceGetCommand.ResponseEntity;
  const workspaceId = currentWorkspace.uuid;
  const handbookId = currentWorkspace.handbookOfWorkspaceUuid as string;

  const appInfo = await getAppInfo();
  const currentWorkspaceInfo = await getCurrentWorkspace(workspaceId);
  const currentHandbookInfo = await getCurrentHandbook(handbookId);
  const allCategoryMaterialsOfHandbook = await getAllCategoryMaterialOfHandbook(
    workspaceId,
    handbookId
  );
  const allFieldsOfCategoryMaterialsOfHandbook = await getAllFieldOfCategoryOfHandbook(
    workspaceId,
    handbookId
  );
  const allGlobalCategories = await getAllGlobalCategories();
  const allFieldTypes = await getAllFieldTypes();

  if (
    !isErrorInArrayFieldTypeGuard([
      appInfo,
      currentWorkspaceInfo,
      currentHandbookInfo,
      allCategoryMaterialsOfHandbook,
      allFieldsOfCategoryMaterialsOfHandbook,
      allGlobalCategories,
      allFieldTypes,
    ])
  ) {
    const appState: AppState = {
      appInfo,
      currentWorkspaceInfo,
      currentHandbookInfo,
      allCategoryMaterialsOfHandbook,
      allFieldsOfCategoryMaterialsOfHandbook,
      allGlobalCategories,
      allFieldTypes,
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
    allGlobalCategories,
    allFieldTypes,
    error: false,
  };
  return appState;
}
