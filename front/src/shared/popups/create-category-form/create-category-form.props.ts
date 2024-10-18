import {
  CategoryMaterialGetAllCommand,
  GlobalCategoryMaterialGetAllCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

export type CreateCategoryProps = {
  isOpenCreateCategoryPopup: boolean;
  onCloseCreateCategoryPopup: VoidFunction;
  allFields: FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
  allGlobalCategories: GlobalCategoryMaterialGetAllCommand.ResponseEntity;
  setTableData: (data: (prevData: CategoryMaterialGetAllCommand.ResponseEntity) => any[]) => void;
};
