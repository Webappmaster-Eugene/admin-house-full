"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceSchema = exports.PriceChangingSchema = exports.MaterialSchema = exports.ResponsiblePartnerProducerSchema = exports.CategoryMaterialSchema = exports.GlobalCategoryMaterialSchema = exports.FieldOfMaterialSchema = exports.FieldUnitMeasurementSchema = exports.FieldVariantsForSelectorFieldTypeSchema = exports.FieldTypeSchema = exports.HandbookSchema = exports.ProjectSchema = exports.OrganizationSchema = exports.WorkspaceSchema = exports.RoleSchema = exports.UserSchema = exports.AppSettingsSchema = exports.RegisterWithRoleKeySchema = exports.EGlobalCategoryVariantsSchema = exports.EFieldTypeVariantsSchema = exports.EUserTypeVariantsSchema = exports.ECurrencyTypeVariantsSchema = exports.ELanguagesTypeVariantsSchema = exports.EStatusAppSchema = exports.NullsOrderSchema = exports.QueryModeSchema = exports.SortOrderSchema = exports.StatusResourceScalarFieldEnumSchema = exports.PriceChangingScalarFieldEnumSchema = exports.MaterialScalarFieldEnumSchema = exports.ResponsiblePartnerProducerScalarFieldEnumSchema = exports.CategoryMaterialScalarFieldEnumSchema = exports.GlobalCategoryMaterialScalarFieldEnumSchema = exports.FieldOfMaterialScalarFieldEnumSchema = exports.FieldUnitMeasurementScalarFieldEnumSchema = exports.FieldVariantsForSelectorFieldTypeScalarFieldEnumSchema = exports.FieldTypeScalarFieldEnumSchema = exports.HandbookScalarFieldEnumSchema = exports.ProjectScalarFieldEnumSchema = exports.OrganizationScalarFieldEnumSchema = exports.WorkspaceScalarFieldEnumSchema = exports.RoleScalarFieldEnumSchema = exports.UserScalarFieldEnumSchema = exports.AppSettingsScalarFieldEnumSchema = exports.RegisterWithRoleKeyScalarFieldEnumSchema = exports.TransactionIsolationLevelSchema = void 0;
const zod_1 = require("zod");
/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////
/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////
exports.TransactionIsolationLevelSchema = zod_1.z.enum(['ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable']);
exports.RegisterWithRoleKeyScalarFieldEnumSchema = zod_1.z.enum(['uuid', 'key']);
exports.AppSettingsScalarFieldEnumSchema = zod_1.z.enum(['uuid', 'name', 'description', 'comment', 'status', 'language', 'currency']);
exports.UserScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'firstName',
    'secondName',
    'avatar',
    'phone',
    'email',
    'password',
    'address',
    'info',
    'documents',
    'roleUuid',
    'creatorOfWorkspaceUuid',
    'handbookManagerUuid',
    'memberOfWorkspaceUuid',
    'memberOfOrganizationUuid',
    'memberOfProjectUuid',
    'createdAt',
    'updatedAt',
]);
exports.RoleScalarFieldEnumSchema = zod_1.z.enum(['uuid', 'idRole', 'name', 'description', 'createdAt', 'updatedAt']);
exports.WorkspaceScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'name',
    'description',
    'workspaceCreatorUuid',
    'handbookOfWorkspaceUuid',
    'createdAt',
    'updatedAt',
]);
exports.OrganizationScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'name',
    'description',
    'workspaceUuid',
    'organizationLeaderUuid',
    'createdAt',
    'updatedAt',
]);
exports.ProjectScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'name',
    'description',
    'organizationUuid',
    'customerMail',
    'customerUuid',
    'responsibleManagerUuid',
    'createdAt',
    'updatedAt',
]);
exports.HandbookScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'name',
    'description',
    'canCustomerView',
    'workspaceUuid',
    'responsibleManagerUuid',
    'createdAt',
    'updatedAt',
]);
exports.FieldTypeScalarFieldEnumSchema = zod_1.z.enum(['uuid', 'name', 'description', 'jsType', 'createdAt', 'updatedAt', 'handbookUuid']);
exports.FieldVariantsForSelectorFieldTypeScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'name',
    'description',
    'fieldTypeUuid',
    'handbookUuid',
    'createdAt',
    'updatedAt',
]);
exports.FieldUnitMeasurementScalarFieldEnumSchema = zod_1.z.enum(['uuid', 'name', 'comment', 'handbookUuid', 'createdAt', 'updatedAt']);
exports.FieldOfMaterialScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'name',
    'comment',
    'isRequired',
    'defaultValue',
    'categoryMaterialUuid',
    'createdByUuid',
    'unitOfMeasurementUuid',
    'fieldTypeUuid',
    'handbookUuid',
    'createdAt',
    'updatedAt',
]);
exports.GlobalCategoryMaterialScalarFieldEnumSchema = zod_1.z.enum(['uuid', 'name', 'nameRu', 'comment', 'color', 'createdAt', 'updatedAt']);
exports.CategoryMaterialScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'name',
    'comment',
    'templateName',
    'globalCategoryMaterialUuid',
    'handbookUuid',
    'createdAt',
    'updatedAt',
]);
exports.ResponsiblePartnerProducerScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'name',
    'comment',
    'info',
    'email',
    'phone',
    'createdAt',
    'updatedAt',
]);
exports.MaterialScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'name',
    'comment',
    'namePublic',
    'handbookUuid',
    'price',
    'unitMeasurementUuid',
    'categoryUuid',
    'responsiblePartnerUuid',
    'createdAt',
    'updatedAt',
]);
exports.PriceChangingScalarFieldEnumSchema = zod_1.z.enum([
    'uuid',
    'newPrice',
    'comment',
    'materialUuid',
    'changedByUuid',
    'createdAt',
    'updatedAt',
]);
exports.StatusResourceScalarFieldEnumSchema = zod_1.z.enum(['uuid', 'name', 'comment', 'createdAt', 'updatedAt']);
exports.SortOrderSchema = zod_1.z.enum(['asc', 'desc']);
exports.QueryModeSchema = zod_1.z.enum(['default', 'insensitive']);
exports.NullsOrderSchema = zod_1.z.enum(['first', 'last']);
exports.EStatusAppSchema = zod_1.z.enum(['UP', 'DOWN']);
exports.ELanguagesTypeVariantsSchema = zod_1.z.enum(['RUSSIAN', 'ENGLISH']);
exports.ECurrencyTypeVariantsSchema = zod_1.z.enum(['RUB', 'USD', 'EUR', 'BYR']);
exports.EUserTypeVariantsSchema = zod_1.z.enum(['ADMIN', 'MANAGER', 'WORKER', 'CUSTOMER']);
exports.EFieldTypeVariantsSchema = zod_1.z.enum(['number', 'string', 'array']);
exports.EGlobalCategoryVariantsSchema = zod_1.z.enum(['PEOPLE', 'MATERIALS', 'OVERHEAD', 'MECHANISMS']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////
/////////////////////////////////////////
// REGISTER WITH ROLE KEY SCHEMA
/////////////////////////////////////////
exports.RegisterWithRoleKeySchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    key: zod_1.z.string(),
});
/////////////////////////////////////////
// APP SETTINGS SCHEMA
/////////////////////////////////////////
exports.AppSettingsSchema = zod_1.z.object({
    status: exports.EStatusAppSchema,
    language: exports.ELanguagesTypeVariantsSchema,
    currency: exports.ECurrencyTypeVariantsSchema,
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    comment: zod_1.z.string(),
});
/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////
exports.UserSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    firstName: zod_1.z.string(),
    secondName: zod_1.z.string().nullable(),
    avatar: zod_1.z.string().nullable(),
    phone: zod_1.z.string().nullable(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    address: zod_1.z.string().nullable(),
    info: zod_1.z.string().nullable(),
    documents: zod_1.z.string().nullable(),
    roleUuid: zod_1.z.string(),
    creatorOfWorkspaceUuid: zod_1.z.string().nullable(),
    handbookManagerUuid: zod_1.z.string().nullable(),
    memberOfWorkspaceUuid: zod_1.z.string().nullable(),
    memberOfOrganizationUuid: zod_1.z.string().nullable(),
    memberOfProjectUuid: zod_1.z.string().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////
exports.RoleSchema = zod_1.z.object({
    name: exports.EUserTypeVariantsSchema,
    uuid: zod_1.z.string().uuid(),
    idRole: zod_1.z.number().int().nullable(),
    description: zod_1.z.string().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// WORKSPACE SCHEMA
/////////////////////////////////////////
exports.WorkspaceSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    workspaceCreatorUuid: zod_1.z.string(),
    handbookOfWorkspaceUuid: zod_1.z.string().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////
exports.OrganizationSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    workspaceUuid: zod_1.z.string(),
    organizationLeaderUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////
exports.ProjectSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    organizationUuid: zod_1.z.string(),
    customerMail: zod_1.z.string(),
    customerUuid: zod_1.z.string(),
    responsibleManagerUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// HANDBOOK SCHEMA
/////////////////////////////////////////
exports.HandbookSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    canCustomerView: zod_1.z.boolean().nullable(),
    workspaceUuid: zod_1.z.string().nullable(),
    responsibleManagerUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// FIELD TYPE SCHEMA
/////////////////////////////////////////
exports.FieldTypeSchema = zod_1.z.object({
    jsType: exports.EFieldTypeVariantsSchema,
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
    handbookUuid: zod_1.z.string().nullable(),
});
/////////////////////////////////////////
// FIELD VARIANTS FOR SELECTOR FIELD TYPE SCHEMA
/////////////////////////////////////////
exports.FieldVariantsForSelectorFieldTypeSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    fieldTypeUuid: zod_1.z.string(),
    handbookUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// FIELD UNIT MEASUREMENT SCHEMA
/////////////////////////////////////////
exports.FieldUnitMeasurementSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable(),
    handbookUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// FIELD OF MATERIAL SCHEMA
/////////////////////////////////////////
exports.FieldOfMaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable(),
    isRequired: zod_1.z.boolean().nullable(),
    defaultValue: zod_1.z.string().nullable(),
    categoryMaterialUuid: zod_1.z.string(),
    createdByUuid: zod_1.z.string(),
    unitOfMeasurementUuid: zod_1.z.string(),
    fieldTypeUuid: zod_1.z.string(),
    handbookUuid: zod_1.z.string().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// GLOBAL CATEGORY MATERIAL SCHEMA
/////////////////////////////////////////
exports.GlobalCategoryMaterialSchema = zod_1.z.object({
    name: exports.EGlobalCategoryVariantsSchema,
    uuid: zod_1.z.string().uuid(),
    nameRu: zod_1.z.string(),
    comment: zod_1.z.string().nullable(),
    color: zod_1.z.string().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// CATEGORY MATERIAL SCHEMA
/////////////////////////////////////////
exports.CategoryMaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable(),
    templateName: zod_1.z.string().nullable(),
    globalCategoryMaterialUuid: zod_1.z.string(),
    handbookUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// RESPONSIBLE PARTNER PRODUCER SCHEMA
/////////////////////////////////////////
exports.ResponsiblePartnerProducerSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable(),
    info: zod_1.z.string().nullable(),
    email: zod_1.z.string().nullable(),
    phone: zod_1.z.string().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// MATERIAL SCHEMA
/////////////////////////////////////////
exports.MaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable(),
    namePublic: zod_1.z.string().nullable(),
    handbookUuid: zod_1.z.string(),
    price: zod_1.z.number(),
    unitMeasurementUuid: zod_1.z.string(),
    categoryUuid: zod_1.z.string(),
    responsiblePartnerUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// PRICE CHANGING SCHEMA
/////////////////////////////////////////
exports.PriceChangingSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    newPrice: zod_1.z.number(),
    comment: zod_1.z.string().nullable(),
    materialUuid: zod_1.z.string(),
    changedByUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// STATUS RESOURCE SCHEMA
/////////////////////////////////////////
exports.StatusResourceSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
