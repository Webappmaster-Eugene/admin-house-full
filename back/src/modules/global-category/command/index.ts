import { CreateGlobalCategoryHandler } from './create-global-category/create-global-category.handler';
import { UpdateGlobalCategoryHandler } from './update-global-category/update-global-category.handler';
import { DeleteGlobalCategoryHandler } from './delete-global-category/delete-global-category.handler';

export const COMMANDS = [
  CreateGlobalCategoryHandler,
  UpdateGlobalCategoryHandler,
  DeleteGlobalCategoryHandler,
];
