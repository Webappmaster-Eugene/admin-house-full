export const axiosEndpoints = {
  // DOC auth
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    register_with_role_key: 'auth/register/with-role/:roleId/:secretKey',
    refresh_keys: 'auth/refresh-keys',
    forgot_password: 'auth/forgot-password',
    verify_reset_code: 'auth/verify-reset-code',
    reset_password: 'auth/reset-password',
    change_password: 'auth/change-password',
    strict_admin_key_generate: 'auth/strict-admin-key/generate',
    strict_admin_key_get: 'auth/strict-admin-key/get',
  },
  // DOC user/me
  users: {
    me: 'user/me',
    get: 'user/:userId',
    get_all: 'user',
    create: 'user',
    update: 'user/:userId',
    delete: 'user/:userId',
  },
  // DOC app-info
  app_info: {
    get: 'app-info',
    update: 'app-info',
  },
  // DOC workspace/:workspaceId
  workspace: {
    get: 'workspace/:workspaceId',
    get_all: 'workspace',
    create: 'workspace',
    update: 'workspace/:workspaceId',
    delete: 'workspace/:workspaceId',
  },
  // DOC organization/workspace/:workspaceId/organization/:organizationId
  organization: {
    get: 'organization/workspace/:workspaceId/organization/:organizationId',
    get_all: 'organization',
    get_all_in_workspace: 'organization/workspace/:workspaceId/get-all-in-workspace',
    create: 'organization/workspace/:workspaceId',
    update: 'organization/workspace/:workspaceId/organization/:organizationId',
    delete: 'organization/workspace/:workspaceId/organization/:organizationId',
  },
  // DOC project/workspace/:workspaceId/organization/:organizationId/project/:projectId
  project: {
    get: 'project/workspace/:workspaceId/organization/:organizationId/project/:projectId',
    get_all: 'project',
    get_all_in_workspace: 'project/workspace/:workspaceId/get-all-in-workspace',
    get_all_in_organization:
      'project/workspace/:workspaceId/organization/:organizationId/get-all-in-organization',
    create: 'project/workspace/:workspaceId/organization/:organizationId',
    update: 'project/workspace/:workspaceId/organization/:organizationId/project/:projectId',
    delete: 'project/workspace/:workspaceId/organization/:organizationId/project/:projectId',
  },
  // DOC handbook/workspace/:workspaceId/handbook/:handbookId
  handbook: {
    get: 'handbook/workspace/:workspaceId/handbook/:handbookId',
    get_all: 'handbook',
    create: 'handbook/workspace/:workspaceId',
    update: 'handbook/workspace/:workspaceId/handbook/:handbookId',
    delete: 'handbook/workspace/:workspaceId/handbook/:handbookId',
  },
  // DOC global-category-material/:globalCategoryMaterialId
  global_category_material: {
    get: 'global-category-material/:globalCategoryMaterialId',
    get_all: 'global-category-material',
    create: 'global-category-material',
    update: 'global-category-material/:globalCategoryMaterialId',
    delete: 'global-category-material/:globalCategoryMaterialId',
  },
  // DOC field-type/:fieldTypeId
  field_type: {
    get: 'field-type/:fieldTypeId',
    get_all: 'field-type',
    create: 'field-type',
    update: 'field-type/:fieldTypeId',
    delete: 'field-type/:fieldTypeId',
  },
  // DOC category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId
  category_material: {
    get: 'category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
    get_all: 'category-material',
    get_all_in_handbook:
      'category-material/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
    create: 'category-material/workspace/:workspaceId/handbook/:handbookId',
    update:
      'category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
    delete:
      'category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
    delete_many: 'category-material/batch/workspace/:workspaceId/handbook/:handbookId',
  },
  // DOC material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId
  material: {
    get: 'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId',
    get_all: 'material',
    get_all_in_handbook: 'material/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
    get_all_in_category_material:
      'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/get-all-in-category-material',
    create:
      'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
    update:
      'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId',
    change_category:
      'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/change-category',
    delete:
      'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId',
  },
  // DOC characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId
  characteristics_material: {
    get: 'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/characteristics-material/:characteristicsMaterialId',
    get_all: 'characteristics-material',
    get_all_in_handbook:
      'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/get-all-in-category-material',
    get_all_in_material:
      'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/get-all-in-material',
    create:
      'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/related-to-field-category-material/:fieldCategoryMaterialId',
    update:
      'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/characteristic-material/:characteristicsMaterialId',
    delete:
      'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/characteristic-material/:characteristicsMaterialId',
  },
  // DOC field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/field-unit-measurement/:fieldUnitMeasurementId
  field_unit_measurement: {
    get: 'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/field-unit-measurement/:fieldUnitMeasurementId',
    get_all: 'field-unit-measurement',
    get_all_in_handbook:
      'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
    create: 'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId',
    update:
      'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/field-unit-measurement/:fieldUnitMeasurementId',
    delete:
      'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/field-unit-measurement/:fieldUnitMeasurementId',
  },
  // DOC field-of-category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId
  field_category_material: {
    get: 'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/field-of-category-material/:fieldOfCategoryMaterialId',
    get_all: 'field-of-category-material',
    get_all_in_handbook:
      'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
    get_all_in_category_material:
      'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/get-all-in-category-material',
    create: 'field-of-category-material/workspace/:workspaceId/handbook/:handbookId',
    update:
      'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/field-of-category-material/:fieldOfCategoryMaterialId',
    delete:
      'field-of-category-material/workspace/:workspaceId/handbook/:handbookId/field-of-category-material/:fieldOfCategoryMaterialId',
  },
  // DOC responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/responsible-partner-producer/:responsiblePartnerProducerId
  responsible_partner_producer: {
    get: 'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/responsible-partner-producer/:responsiblePartnerProducerId',
    get_all: 'responsible-partner-producer',
    get_all_in_handbook:
      'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
    create: 'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId',
    update:
      'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/responsible-partner-producer/:responsiblePartnerProducerId',
    delete:
      'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/responsible-partner-producer/:responsiblePartnerProducerId',
  },
  // DOC unit-template/workspace/:workspaceId/handbook/:handbookId/...
  unit_template: {
    get: 'unit-template/workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId',
    get_all_in_handbook: 'unit-template/workspace/:workspaceId/handbook/:handbookId/get-all',
    create: 'unit-template/workspace/:workspaceId/handbook/:handbookId/create',
    update:
      'unit-template/workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/update',
    delete:
      'unit-template/workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/delete',
    component_create:
      'unit-template/workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/component/create',
    component_update:
      'unit-template/workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/component/:componentId/update',
    component_delete:
      'unit-template/workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/component/:componentId/delete',
  },
  // DOC estimate/workspace/:workspaceId/project/:projectId/...
  estimate: {
    get: 'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId',
    get_all_in_project: 'estimate/workspace/:workspaceId/project/:projectId/get-all',
    create: 'estimate/workspace/:workspaceId/project/:projectId/create',
    update: 'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId/update',
    delete: 'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId/delete',
    export: 'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId/export',
    section_create:
      'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/create',
    section_update:
      'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/update',
    section_delete:
      'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/delete',
    item_create:
      'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/item/create',
    item_update:
      'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/item/:itemId/update',
    item_delete:
      'estimate/workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/item/:itemId/delete',
  },
  // DOC field-variants/workspace/:workspaceId/handbook/:handbookId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId
  field_variants: {
    get: 'field-variants/workspace/:workspaceId/handbook/:handbookId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId',
    get_all: 'field-variants',
    get_all_in_handbook:
      'field-variants/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
    get_all_in_field_of_category_material:
      'field-variants/workspace/:workspaceId/handbook/:handbookId/field-of-category-material/:fieldOfCategoryMaterialId/get-all-in-field-of-category-material',
    create:
      'field-variants/workspace/:workspaceId/handbook/:handbookId/field-of-category-material/:fieldOfCategoryMaterialId',
    update:
      'field-variants/workspace/:workspaceId/handbook/:handbookId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId',
    delete:
      'field-variants/workspace/:workspaceId/handbook/:handbookId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId',
  },
};
