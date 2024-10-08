import {
  CategoryMaterialGetCommand,
  GlobalCategoryMaterialGetAllCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

export type EditCategoryProps = {
  open: boolean;
  onClose: VoidFunction;
  currentCategoryInfo: CategoryMaterialGetCommand.ResponseEntity;
  allFields: FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
  allGlobalCategories: GlobalCategoryMaterialGetAllCommand.ResponseEntity;
};
