import {
  AppInfoGetCommand,
  HandbookGetCommand,
  WorkspaceGetCommand,
  FieldTypeGetAllCommand,
  CategoryMaterialGetAllCommand,
  FieldUnitMeasurementGetAllCommand,
  GlobalCategoryMaterialGetAllCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@/../../back/libs/contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';

export type AppState = {
  appInfo: AppInfoGetCommand.ResponseEntity | ErrorFromBackend;
  currentWorkspaceInfo: WorkspaceGetCommand.ResponseEntity | ErrorFromBackend;
  currentHandbookInfo: HandbookGetCommand.ResponseEntity | ErrorFromBackend;
  allCategoryMaterialsOfHandbook: CategoryMaterialGetAllCommand.ResponseEntity | ErrorFromBackend;
  allFieldsOfCategoryMaterialsOfHandbook:
    | FieldOfCategoryMaterialGetAllCommand.ResponseEntity
    | ErrorFromBackend;
  allFieldsUnitMeasurementsOfHandbook:
    | FieldUnitMeasurementGetAllCommand.ResponseEntity
    | ErrorFromBackend;
  allGlobalCategories: GlobalCategoryMaterialGetAllCommand.ResponseEntity | ErrorFromBackend;
  allFieldTypes: FieldTypeGetAllCommand.ResponseEntity | ErrorFromBackend;
  error: boolean;
};
