import {
  MaterialGetAllCommand,
  CategoryMaterialGetCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

export type MaterialsProps = {
  materialsInfo: MaterialGetAllCommand.ResponseEntity;
  additionalFields?: FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
  currentCategory?: CategoryMaterialGetCommand.ResponseEntity;
};
