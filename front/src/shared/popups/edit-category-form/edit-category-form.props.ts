import {
  CategoryMaterialGetCommand,
  CategoryMaterialGetAllCommand,
  GlobalCategoryMaterialGetAllCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

export type EditCategoryProps = {
  isOpenEditCategoryForm: boolean;
  onCloseEditCategoryForm: VoidFunction;
  currentCategoryInfo: CategoryMaterialGetCommand.ResponseEntity;
  allFields: FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
  allGlobalCategories: GlobalCategoryMaterialGetAllCommand.ResponseEntity;
  setTableData: (data: (prevData: CategoryMaterialGetAllCommand.ResponseEntity) => any[]) => void;
};
