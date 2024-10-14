import {
  MaterialGetAllCommand,
  CategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

export type CategoryMaterialProps = {
  allCategoriesInWorkspace: CategoryMaterialGetAllCommand.ResponseEntity;
  materials?: MaterialGetAllCommand.ResponseEntity;
};
