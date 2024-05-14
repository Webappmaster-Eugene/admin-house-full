import { GetGlobalCategoryMaterialByIdHandler } from './get-global-category-material-by-id/get-global-category-material-by-id.handler';
import { GetAllGlobalCategoryMaterialsHandler } from './get-all-global-category-materials/get-all-global-category-materials.handler';

export const QUERIES = [
  GetAllGlobalCategoryMaterialsHandler,
  GetGlobalCategoryMaterialByIdHandler,
];
