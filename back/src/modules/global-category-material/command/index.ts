import { CreateGlobalCategoryMaterialHandler } from './create-global-category-material/create-global-category-material.handler';
import { UpdateGlobalCategoryMaterialHandler } from './update-global-category-material/update-global-category-material.handler';
import { DeleteGlobalCategoryMaterialHandler } from './delete-global-category-material/delete-global-category-material.handler';

export const COMMANDS = [
  CreateGlobalCategoryMaterialHandler,
  UpdateGlobalCategoryMaterialHandler,
  DeleteGlobalCategoryMaterialHandler,
];
