import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable']);

export const RegisterWithRoleKeyScalarFieldEnumSchema = z.enum(['uuid', 'key']);

export const AppSettingsScalarFieldEnumSchema = z.enum(['uuid', 'name', 'description', 'comment', 'status', 'language', 'currency']);

export const UserScalarFieldEnumSchema = z.enum([
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

export const RoleScalarFieldEnumSchema = z.enum(['uuid', 'idRole', 'name', 'description', 'createdAt', 'updatedAt']);

export const WorkspaceScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'workspaceCreatorUuid',
  'handbookOfWorkspaceUuid',
  'createdAt',
  'updatedAt',
]);

export const OrganizationScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'workspaceUuid',
  'organizationLeaderUuid',
  'createdAt',
  'updatedAt',
]);

export const ProjectScalarFieldEnumSchema = z.enum([
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

export const HandbookScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'canCustomerView',
  'workspaceUuid',
  'responsibleManagerUuid',
  'createdAt',
  'updatedAt',
]);

export const FieldTypeScalarFieldEnumSchema = z.enum(['uuid', 'name', 'description', 'jsType', 'handbookUuid', 'createdAt', 'updatedAt']);

export const FieldVariantsForSelectorFieldTypeScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'fieldTypeUuid',
  'handbookUuid',
  'createdAt',
  'updatedAt',
]);

export const FieldUnitMeasurementScalarFieldEnumSchema = z.enum(['uuid', 'name', 'comment', 'handbookUuid', 'createdAt', 'updatedAt']);

export const GlobalCategoryMaterialScalarFieldEnumSchema = z.enum(['uuid', 'name', 'nameRu', 'comment', 'color', 'createdAt', 'updatedAt']);

export const CategoryMaterialScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'comment',
  'templateName',
  'globalCategoryMaterialUuid',
  'createdAt',
  'updatedAt',
]);

export const ResponsiblePartnerProducerScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'comment',
  'info',
  'email',
  'phone',
  'createdAt',
  'updatedAt',
]);

export const FieldOfMaterialScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'comment',
  'isRequired',
  'defaultValue',
  'categoryUuid',
  'createdByUuid',
  'unitOfMeasurementUuid',
  'fieldTypeUuid',
  'createdAt',
  'updatedAt',
]);

export const MaterialScalarFieldEnumSchema = z.enum([
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

export const PriceChangingScalarFieldEnumSchema = z.enum([
  'uuid',
  'newPrice',
  'comment',
  'materialUuid',
  'changedByUuid',
  'createdAt',
  'updatedAt',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);

export const EStatusAppSchema = z.enum(['UP', 'DOWN']);

export type EStatusAppType = `${z.infer<typeof EStatusAppSchema>}`;

export const ELanguagesTypeVariantsSchema = z.enum(['RUSSIAN', 'ENGLISH']);

export type ELanguagesTypeVariantsType = `${z.infer<typeof ELanguagesTypeVariantsSchema>}`;

export const ECurrencyTypeVariantsSchema = z.enum(['RUB', 'USD', 'EUR', 'BYR']);

export type ECurrencyTypeVariantsType = `${z.infer<typeof ECurrencyTypeVariantsSchema>}`;

export const EUserTypeVariantsSchema = z.enum(['ADMIN', 'MANAGER', 'WORKER', 'CUSTOMER']);

export type EUserTypeVariantsType = `${z.infer<typeof EUserTypeVariantsSchema>}`;

export const EFieldTypeVariantsSchema = z.enum(['number', 'string', 'array']);

export type EFieldTypeVariantsType = `${z.infer<typeof EFieldTypeVariantsSchema>}`;

export const EGlobalCategoryVariantsSchema = z.enum(['PEOPLE', 'MATERIALS', 'OVERHEAD', 'MECHANISMS']);

export type EGlobalCategoryVariantsType = `${z.infer<typeof EGlobalCategoryVariantsSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// REGISTER WITH ROLE KEY SCHEMA
/////////////////////////////////////////

export const RegisterWithRoleKeySchema = z.object({
  uuid: z.string().uuid(),
  key: z.string(),
});

export type RegisterWithRoleKey = z.infer<typeof RegisterWithRoleKeySchema>;

/////////////////////////////////////////
// APP SETTINGS SCHEMA
/////////////////////////////////////////

export const AppSettingsSchema = z.object({
  status: EStatusAppSchema,
  language: ELanguagesTypeVariantsSchema,
  currency: ECurrencyTypeVariantsSchema,
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  comment: z.string(),
});

export type AppSettings = z.infer<typeof AppSettingsSchema>;

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  uuid: z.string().uuid(),
  firstName: z.string(),
  secondName: z.string().nullable(),
  avatar: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string(),
  password: z.string(),
  address: z.string().nullable(),
  info: z.string().nullable(),
  documents: z.string().nullable(),
  roleUuid: z.string(),
  creatorOfWorkspaceUuid: z.string().nullable(),
  handbookManagerUuid: z.string().nullable(),
  memberOfWorkspaceUuid: z.string().nullable(),
  memberOfOrganizationUuid: z.string().nullable(),
  memberOfProjectUuid: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  name: EUserTypeVariantsSchema,
  uuid: z.string().uuid(),
  idRole: z.number().int().nullable(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Role = z.infer<typeof RoleSchema>;

/////////////////////////////////////////
// WORKSPACE SCHEMA
/////////////////////////////////////////

export const WorkspaceSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  workspaceCreatorUuid: z.string(),
  handbookOfWorkspaceUuid: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Workspace = z.infer<typeof WorkspaceSchema>;

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  workspaceUuid: z.string(),
  organizationLeaderUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Organization = z.infer<typeof OrganizationSchema>;

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  organizationUuid: z.string(),
  customerMail: z.string(),
  customerUuid: z.string(),
  responsibleManagerUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Project = z.infer<typeof ProjectSchema>;

/////////////////////////////////////////
// HANDBOOK SCHEMA
/////////////////////////////////////////

export const HandbookSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  canCustomerView: z.boolean().nullable(),
  workspaceUuid: z.string().nullable(),
  responsibleManagerUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Handbook = z.infer<typeof HandbookSchema>;

/////////////////////////////////////////
// FIELD TYPE SCHEMA
/////////////////////////////////////////

export const FieldTypeSchema = z.object({
  jsType: EFieldTypeVariantsSchema,
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  handbookUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FieldType = z.infer<typeof FieldTypeSchema>;

/////////////////////////////////////////
// FIELD VARIANTS FOR SELECTOR FIELD TYPE SCHEMA
/////////////////////////////////////////

export const FieldVariantsForSelectorFieldTypeSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  fieldTypeUuid: z.string(),
  handbookUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FieldVariantsForSelectorFieldType = z.infer<typeof FieldVariantsForSelectorFieldTypeSchema>;

/////////////////////////////////////////
// FIELD UNIT MEASUREMENT SCHEMA
/////////////////////////////////////////

export const FieldUnitMeasurementSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable(),
  handbookUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FieldUnitMeasurement = z.infer<typeof FieldUnitMeasurementSchema>;

/////////////////////////////////////////
// GLOBAL CATEGORY MATERIAL SCHEMA
/////////////////////////////////////////

export const GlobalCategoryMaterialSchema = z.object({
  name: EGlobalCategoryVariantsSchema,
  uuid: z.string().uuid(),
  nameRu: z.string(),
  comment: z.string().nullable(),
  color: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type GlobalCategoryMaterial = z.infer<typeof GlobalCategoryMaterialSchema>;

/////////////////////////////////////////
// CATEGORY MATERIAL SCHEMA
/////////////////////////////////////////

export const CategoryMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable(),
  templateName: z.string().nullable(),
  globalCategoryMaterialUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CategoryMaterial = z.infer<typeof CategoryMaterialSchema>;

/////////////////////////////////////////
// RESPONSIBLE PARTNER PRODUCER SCHEMA
/////////////////////////////////////////

export const ResponsiblePartnerProducerSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable(),
  info: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ResponsiblePartnerProducer = z.infer<typeof ResponsiblePartnerProducerSchema>;

/////////////////////////////////////////
// FIELD OF MATERIAL SCHEMA
/////////////////////////////////////////

export const FieldOfMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable(),
  isRequired: z.boolean().nullable(),
  defaultValue: z.string().nullable(),
  categoryUuid: z.string(),
  createdByUuid: z.string(),
  unitOfMeasurementUuid: z.string(),
  fieldTypeUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FieldOfMaterial = z.infer<typeof FieldOfMaterialSchema>;

/////////////////////////////////////////
// MATERIAL SCHEMA
/////////////////////////////////////////

export const MaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable(),
  namePublic: z.boolean().nullable(),
  handbookUuid: z.string(),
  price: z.number(),
  unitMeasurementUuid: z.string(),
  categoryUuid: z.string(),
  responsiblePartnerUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Material = z.infer<typeof MaterialSchema>;

/////////////////////////////////////////
// PRICE CHANGING SCHEMA
/////////////////////////////////////////

export const PriceChangingSchema = z.object({
  uuid: z.string().uuid(),
  newPrice: z.number(),
  comment: z.string().nullable(),
  materialUuid: z.string(),
  changedByUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type PriceChanging = z.infer<typeof PriceChangingSchema>;
