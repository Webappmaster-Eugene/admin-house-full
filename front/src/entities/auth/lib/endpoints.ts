export const axiosEndpoints = {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    register_with_role_key: 'auth/register/with-role/:roleId/:secretKey',
    refresh_keys: 'auth/refresh-keys',
  },
  users: {
    me: 'user/me',
    get: 'user/:userId',
    get_all: 'user',
    create: 'user',
    delete: 'user/:userId',
    update: 'user/:userId',
  },
  app_info: {
    get: 'app-info',
    update: 'app-info',
  },
  material: {
    get: 'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId',
    get_all: 'material',
    get_all_in_handbook: 'material/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
    get_all_in_category_material:
      'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/get-all-in-category-material',
    update:
      'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId',
    create:
      'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
    delete:
      'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId',
  },
  fields: {
    get: 'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId',
    get_all: 'field-of-category-material',
    get_all_in_handbook:
      'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
    get_all_in_category_material:
      'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/get-all-in-category-material',
    update:
      'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId',
    create:
      'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
    delete:
      'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId',
  },
};
