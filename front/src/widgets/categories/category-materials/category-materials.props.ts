import {
  MaterialGetAllCommand,
  CategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

export type CategoryMaterialProps = {
  categories: CategoryMaterialGetAllCommand.ResponseEntity;
  materials?: MaterialGetAllCommand.ResponseEntity;
};
