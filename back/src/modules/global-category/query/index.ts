import { GetGlobalCategoryByIdHandler } from './get-global-category-by-id/get-global-category-by-id.handler';
import { GetAllGlobalCategoriesHandler } from './get-all-global-categories/get-all-global-categories.handler';

export const QUERIES = [
  GetAllGlobalCategoriesHandler,
  GetGlobalCategoryByIdHandler,
];
