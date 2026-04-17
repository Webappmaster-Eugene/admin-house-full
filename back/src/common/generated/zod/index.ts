import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable']);

export const RegisterWithRoleKeyScalarFieldEnumSchema = z.enum(['uuid', 'key', 'lastChangeByUserUuid', 'createdAt', 'updatedAt']);

export const PasswordResetCodeScalarFieldEnumSchema = z.enum(['uuid', 'email', 'code', 'expiresAt', 'used', 'createdAt']);

export const AppInfoScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'comment',
  'status',
  'language',
  'currency',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const RoleScalarFieldEnumSchema = z.enum([
  'uuid',
  'idRole',
  'name',
  'description',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

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
  'userStatus',
  'creatorOfWorkspaceUuid',
  'handbookManagerUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const WorkspaceScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'workspaceStatus',
  'workspaceCreatorUuid',
  'handbookOfWorkspaceUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const HandbookScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'handbookStatus',
  'canCustomerView',
  'workspaceUuid',
  'responsibleManagerUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const OrganizationScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'organizationStatus',
  'workspaceUuid',
  'organizationLeaderUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const ProjectScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'projectStatus',
  'organizationUuid',
  'customerMail',
  'customerUuid',
  'responsibleManagerUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const FieldTypeScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'jsType',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const GlobalCategoryMaterialScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'nameRu',
  'comment',
  'color',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const CategoryMaterialScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'comment',
  'isDefault',
  'numInOrder',
  'templateName',
  'categoryMaterialStatus',
  'globalCategoryMaterialUuid',
  'handbookUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const FieldUnitMeasurementScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'comment',
  'isDefault',
  'numInOrder',
  'handbookUuid',
  'fieldUnitMeasurementStatus',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const FieldOfCategoryMaterialScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'uniqueNameForTemplate',
  'comment',
  'numInOrder',
  'fieldOfCategoryMaterialStatus',
  'isRequired',
  'defaultValue',
  'unitOfMeasurementUuid',
  'fieldTypeUuid',
  'handbookUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const FieldVariantsForSelectorFieldTypeScalarFieldEnumSchema = z.enum([
  'uuid',
  'value',
  'description',
  'numInOrder',
  'fieldVariantsForSelectorFieldTypeStatus',
  'handbookUuid',
  'fieldOfCategoryMaterialUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const ResponsiblePartnerProducerScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'comment',
  'numInOrder',
  'responsiblePartnerProducerStatus',
  'info',
  'email',
  'phone',
  'handbookUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const MaterialScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'comment',
  'numInOrder',
  'materialStatus',
  'sourceInfo',
  'namePublic',
  'price',
  'handbookUuid',
  'unitMeasurementUuid',
  'categoryMaterialUuid',
  'responsiblePartnerUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const CharacteristicsMaterialScalarFieldEnumSchema = z.enum([
  'uuid',
  'value',
  'numInOrder',
  'characteristicsMaterialStatus',
  'comment',
  'fieldOfCategoryMaterialUuid',
  'handbookUuid',
  'materialUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const PriceChangingScalarFieldEnumSchema = z.enum([
  'uuid',
  'newPrice',
  'oldPrice',
  'source',
  'comment',
  'materialUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const StatusResourceScalarFieldEnumSchema = z.enum(['uuid', 'name', 'comment', 'lastChangeByUserUuid', 'createdAt', 'updatedAt']);

export const StatusApproveScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'nameRu',
  'comment',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const TechLogChangesScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'entity',
  'comment',
  'action',
  'oldInfo',
  'newInfo',
  'updateInfo',
  'createdAt',
  'updatedAt',
]);

export const EstimateScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'estimateStatus',
  'defaultMarkupPercent',
  'totalCost',
  'totalClientPrice',
  'projectUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const EstimateSectionScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'orderIndex',
  'estimateUuid',
  'parentSectionUuid',
  'sectionTotalCost',
  'sectionTotalClientPrice',
  'createdAt',
  'updatedAt',
]);

export const EstimateItemScalarFieldEnumSchema = z.enum([
  'uuid',
  'orderIndex',
  'itemType',
  'sectionUuid',
  'materialUuid',
  'unitTemplateUuid',
  'name',
  'unitMeasurement',
  'quantity',
  'unitCost',
  'markupPercent',
  'unitClientPrice',
  'totalCost',
  'totalClientPrice',
  'comment',
  'createdAt',
  'updatedAt',
]);

export const UnitTemplateScalarFieldEnumSchema = z.enum([
  'uuid',
  'name',
  'description',
  'unitMeasurement',
  'unitCost',
  'defaultMarkupPercent',
  'unitClientPrice',
  'handbookUuid',
  'lastChangeByUserUuid',
  'createdAt',
  'updatedAt',
]);

export const UnitTemplateComponentScalarFieldEnumSchema = z.enum([
  'uuid',
  'orderIndex',
  'itemType',
  'unitTemplateUuid',
  'materialUuid',
  'name',
  'unitMeasurement',
  'quantityPerUnit',
  'unitCost',
  'comment',
  'createdAt',
  'updatedAt',
]);

export const EstimateItemComponentScalarFieldEnumSchema = z.enum([
  'uuid',
  'orderIndex',
  'estimateItemUuid',
  'itemType',
  'materialUuid',
  'name',
  'unitMeasurement',
  'quantityPerUnit',
  'unitCost',
  'totalCost',
  'comment',
  'createdAt',
  'updatedAt',
]);

export const FileStorageScalarFieldEnumSchema = z.enum([
  'uuid',
  'nameFile',
  'comment',
  'link',
  'lastChangeByUserUuid',
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

export const EGlobalCategoryMaterialVariantsSchema = z.enum(['PEOPLE', 'MATERIALS', 'OVERHEAD', 'MECHANISMS']);

export type EGlobalCategoryMaterialVariantsType = `${z.infer<typeof EGlobalCategoryMaterialVariantsSchema>}`;

export const EEntityActionsSchema = z.enum(['DELETE', 'UPDATE', 'CREATE']);

export type EEntityActionsType = `${z.infer<typeof EEntityActionsSchema>}`;

export const EApproveStatusesSchema = z.enum(['ONAPPROVAL', 'REFUSUAL', 'AGREED']);

export type EApproveStatusesType = `${z.infer<typeof EApproveStatusesSchema>}`;

export const EActiveStatusesSchema = z.enum(['ACTIVE', 'INACTIVE', 'DELETED']);

export type EActiveStatusesType = `${z.infer<typeof EActiveStatusesSchema>}`;

export const EEstimateItemTypeSchema = z.enum(['MATERIAL', 'MECHANISM', 'WORK', 'OVERHEAD', 'UNIT']);

export type EEstimateItemTypeType = `${z.infer<typeof EEstimateItemTypeSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// REGISTER WITH ROLE KEY SCHEMA
/////////////////////////////////////////

export const RegisterWithRoleKeySchema = z.object({
  uuid: z.string(),
  key: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type RegisterWithRoleKey = z.infer<typeof RegisterWithRoleKeySchema>;

// REGISTER WITH ROLE KEY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RegisterWithRoleKeyOptionalDefaultsSchema = RegisterWithRoleKeySchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type RegisterWithRoleKeyOptionalDefaults = z.infer<typeof RegisterWithRoleKeyOptionalDefaultsSchema>;

/////////////////////////////////////////
// PASSWORD RESET CODE SCHEMA
/////////////////////////////////////////

export const PasswordResetCodeSchema = z.object({
  uuid: z.string(),
  email: z.string(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  used: z.boolean(),
  createdAt: z.coerce.date(),
});

export type PasswordResetCode = z.infer<typeof PasswordResetCodeSchema>;

// PASSWORD RESET CODE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PasswordResetCodeOptionalDefaultsSchema = PasswordResetCodeSchema.merge(
  z.object({
    uuid: z.string().optional(),
    used: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
  }),
);

export type PasswordResetCodeOptionalDefaults = z.infer<typeof PasswordResetCodeOptionalDefaultsSchema>;

/////////////////////////////////////////
// APP INFO SCHEMA
/////////////////////////////////////////

export const AppInfoSchema = z.object({
  status: EStatusAppSchema,
  language: ELanguagesTypeVariantsSchema,
  currency: ECurrencyTypeVariantsSchema,
  uuid: z.string(),
  name: z.string(),
  description: z.string(),
  comment: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type AppInfo = z.infer<typeof AppInfoSchema>;

// APP INFO OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AppInfoOptionalDefaultsSchema = AppInfoSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type AppInfoOptionalDefaults = z.infer<typeof AppInfoOptionalDefaultsSchema>;

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  name: EUserTypeVariantsSchema,
  uuid: z.string(),
  idRole: z.number(),
  description: z.string().nullish(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Role = z.infer<typeof RoleSchema>;

// ROLE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RoleOptionalDefaultsSchema = RoleSchema.merge(
  z.object({
    uuid: z.string().optional(),
    idRole: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type RoleOptionalDefaults = z.infer<typeof RoleOptionalDefaultsSchema>;

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  userStatus: EActiveStatusesSchema,
  uuid: z.string(),
  firstName: z.string(),
  secondName: z.string().nullish(),
  avatar: z.string().nullish(),
  phone: z.string().nullish(),
  email: z.string(),
  password: z.string(),
  address: z.string().nullish(),
  info: z.string().nullish(),
  documents: z.string().nullish(),
  creatorOfWorkspaceUuid: z.string().nullish(),
  handbookManagerUuid: z.string().nullish(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(
  z.object({
    userStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>;

/////////////////////////////////////////
// WORKSPACE SCHEMA
/////////////////////////////////////////

export const WorkspaceSchema = z.object({
  workspaceStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  workspaceCreatorUuid: z.string(),
  handbookOfWorkspaceUuid: z.string().nullish(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Workspace = z.infer<typeof WorkspaceSchema>;

// WORKSPACE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const WorkspaceOptionalDefaultsSchema = WorkspaceSchema.merge(
  z.object({
    workspaceStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type WorkspaceOptionalDefaults = z.infer<typeof WorkspaceOptionalDefaultsSchema>;

/////////////////////////////////////////
// HANDBOOK SCHEMA
/////////////////////////////////////////

export const HandbookSchema = z.object({
  handbookStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  canCustomerView: z.boolean(),
  workspaceUuid: z.string(),
  responsibleManagerUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Handbook = z.infer<typeof HandbookSchema>;

// HANDBOOK OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const HandbookOptionalDefaultsSchema = HandbookSchema.merge(
  z.object({
    handbookStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    canCustomerView: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type HandbookOptionalDefaults = z.infer<typeof HandbookOptionalDefaultsSchema>;

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  organizationStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  workspaceUuid: z.string(),
  organizationLeaderUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Organization = z.infer<typeof OrganizationSchema>;

// ORGANIZATION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const OrganizationOptionalDefaultsSchema = OrganizationSchema.merge(
  z.object({
    organizationStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type OrganizationOptionalDefaults = z.infer<typeof OrganizationOptionalDefaultsSchema>;

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  projectStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  organizationUuid: z.string(),
  customerMail: z.string().nullish(),
  customerUuid: z.string().nullish(),
  responsibleManagerUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Project = z.infer<typeof ProjectSchema>;

// PROJECT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ProjectOptionalDefaultsSchema = ProjectSchema.merge(
  z.object({
    projectStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type ProjectOptionalDefaults = z.infer<typeof ProjectOptionalDefaultsSchema>;

/////////////////////////////////////////
// FIELD TYPE SCHEMA
/////////////////////////////////////////

export const FieldTypeSchema = z.object({
  jsType: EFieldTypeVariantsSchema,
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FieldType = z.infer<typeof FieldTypeSchema>;

// FIELD TYPE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FieldTypeOptionalDefaultsSchema = FieldTypeSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type FieldTypeOptionalDefaults = z.infer<typeof FieldTypeOptionalDefaultsSchema>;

/////////////////////////////////////////
// GLOBAL CATEGORY MATERIAL SCHEMA
/////////////////////////////////////////

export const GlobalCategoryMaterialSchema = z.object({
  name: EGlobalCategoryMaterialVariantsSchema,
  uuid: z.string(),
  nameRu: z.string().nullish(),
  comment: z.string().nullish(),
  color: z.string().nullish(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type GlobalCategoryMaterial = z.infer<typeof GlobalCategoryMaterialSchema>;

// GLOBAL CATEGORY MATERIAL OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const GlobalCategoryMaterialOptionalDefaultsSchema = GlobalCategoryMaterialSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type GlobalCategoryMaterialOptionalDefaults = z.infer<typeof GlobalCategoryMaterialOptionalDefaultsSchema>;

/////////////////////////////////////////
// CATEGORY MATERIAL SCHEMA
/////////////////////////////////////////

export const CategoryMaterialSchema = z.object({
  categoryMaterialStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  comment: z.string().nullish(),
  isDefault: z.boolean(),
  numInOrder: z.number().nullish(),
  templateName: z.string().nullish(),
  globalCategoryMaterialUuid: z.string(),
  handbookUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CategoryMaterial = z.infer<typeof CategoryMaterialSchema>;

// CATEGORY MATERIAL OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CategoryMaterialOptionalDefaultsSchema = CategoryMaterialSchema.merge(
  z.object({
    categoryMaterialStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    isDefault: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type CategoryMaterialOptionalDefaults = z.infer<typeof CategoryMaterialOptionalDefaultsSchema>;

/////////////////////////////////////////
// FIELD UNIT MEASUREMENT SCHEMA
/////////////////////////////////////////

export const FieldUnitMeasurementSchema = z.object({
  fieldUnitMeasurementStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  comment: z.string().nullish(),
  isDefault: z.boolean(),
  numInOrder: z.number().nullish(),
  handbookUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FieldUnitMeasurement = z.infer<typeof FieldUnitMeasurementSchema>;

// FIELD UNIT MEASUREMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FieldUnitMeasurementOptionalDefaultsSchema = FieldUnitMeasurementSchema.merge(
  z.object({
    fieldUnitMeasurementStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    isDefault: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type FieldUnitMeasurementOptionalDefaults = z.infer<typeof FieldUnitMeasurementOptionalDefaultsSchema>;

/////////////////////////////////////////
// FIELD OF CATEGORY MATERIAL SCHEMA
/////////////////////////////////////////

export const FieldOfCategoryMaterialSchema = z.object({
  fieldOfCategoryMaterialStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  uniqueNameForTemplate: z.string().nullish(),
  comment: z.string().nullish(),
  numInOrder: z.number().nullish(),
  isRequired: z.boolean(),
  defaultValue: z.string().nullish(),
  unitOfMeasurementUuid: z.string(),
  fieldTypeUuid: z.string(),
  handbookUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FieldOfCategoryMaterial = z.infer<typeof FieldOfCategoryMaterialSchema>;

// FIELD OF CATEGORY MATERIAL OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FieldOfCategoryMaterialOptionalDefaultsSchema = FieldOfCategoryMaterialSchema.merge(
  z.object({
    fieldOfCategoryMaterialStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    isRequired: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type FieldOfCategoryMaterialOptionalDefaults = z.infer<typeof FieldOfCategoryMaterialOptionalDefaultsSchema>;

/////////////////////////////////////////
// FIELD VARIANTS FOR SELECTOR FIELD TYPE SCHEMA
/////////////////////////////////////////

export const FieldVariantsForSelectorFieldTypeSchema = z.object({
  fieldVariantsForSelectorFieldTypeStatus: EActiveStatusesSchema,
  uuid: z.string(),
  value: z.string(),
  description: z.string().nullish(),
  numInOrder: z.number().nullish(),
  handbookUuid: z.string(),
  fieldOfCategoryMaterialUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FieldVariantsForSelectorFieldType = z.infer<typeof FieldVariantsForSelectorFieldTypeSchema>;

// FIELD VARIANTS FOR SELECTOR FIELD TYPE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FieldVariantsForSelectorFieldTypeOptionalDefaultsSchema = FieldVariantsForSelectorFieldTypeSchema.merge(
  z.object({
    fieldVariantsForSelectorFieldTypeStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type FieldVariantsForSelectorFieldTypeOptionalDefaults = z.infer<typeof FieldVariantsForSelectorFieldTypeOptionalDefaultsSchema>;

/////////////////////////////////////////
// RESPONSIBLE PARTNER PRODUCER SCHEMA
/////////////////////////////////////////

export const ResponsiblePartnerProducerSchema = z.object({
  responsiblePartnerProducerStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  comment: z.string().nullish(),
  numInOrder: z.number().nullish(),
  info: z.string().nullish(),
  email: z.string().nullish(),
  phone: z.string().nullish(),
  handbookUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ResponsiblePartnerProducer = z.infer<typeof ResponsiblePartnerProducerSchema>;

// RESPONSIBLE PARTNER PRODUCER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ResponsiblePartnerProducerOptionalDefaultsSchema = ResponsiblePartnerProducerSchema.merge(
  z.object({
    responsiblePartnerProducerStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type ResponsiblePartnerProducerOptionalDefaults = z.infer<typeof ResponsiblePartnerProducerOptionalDefaultsSchema>;

/////////////////////////////////////////
// MATERIAL SCHEMA
/////////////////////////////////////////

export const MaterialSchema = z.object({
  materialStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  comment: z.string().nullish(),
  numInOrder: z.number().nullish(),
  sourceInfo: z.string().nullish(),
  namePublic: z.string().nullish(),
  price: z.number().nullish(),
  handbookUuid: z.string(),
  unitMeasurementUuid: z.string().nullish(),
  categoryMaterialUuid: z.string().nullish(),
  responsiblePartnerUuid: z.string().nullish(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Material = z.infer<typeof MaterialSchema>;

// MATERIAL OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const MaterialOptionalDefaultsSchema = MaterialSchema.merge(
  z.object({
    materialStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type MaterialOptionalDefaults = z.infer<typeof MaterialOptionalDefaultsSchema>;

/////////////////////////////////////////
// CHARACTERISTICS MATERIAL SCHEMA
/////////////////////////////////////////

export const CharacteristicsMaterialSchema = z.object({
  characteristicsMaterialStatus: EActiveStatusesSchema,
  uuid: z.string(),
  value: z.string(),
  numInOrder: z.number().nullish(),
  comment: z.string().nullish(),
  fieldOfCategoryMaterialUuid: z.string(),
  handbookUuid: z.string(),
  materialUuid: z.string().nullish(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CharacteristicsMaterial = z.infer<typeof CharacteristicsMaterialSchema>;

// CHARACTERISTICS MATERIAL OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CharacteristicsMaterialOptionalDefaultsSchema = CharacteristicsMaterialSchema.merge(
  z.object({
    characteristicsMaterialStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type CharacteristicsMaterialOptionalDefaults = z.infer<typeof CharacteristicsMaterialOptionalDefaultsSchema>;

/////////////////////////////////////////
// PRICE CHANGING SCHEMA
/////////////////////////////////////////

export const PriceChangingSchema = z.object({
  uuid: z.string(),
  newPrice: z.number(),
  oldPrice: z.number().nullish(),
  source: z.string().nullish(),
  comment: z.string().nullish(),
  materialUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type PriceChanging = z.infer<typeof PriceChangingSchema>;

// PRICE CHANGING OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PriceChangingOptionalDefaultsSchema = PriceChangingSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type PriceChangingOptionalDefaults = z.infer<typeof PriceChangingOptionalDefaultsSchema>;

/////////////////////////////////////////
// STATUS RESOURCE SCHEMA
/////////////////////////////////////////

export const StatusResourceSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  comment: z.string().nullish(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type StatusResource = z.infer<typeof StatusResourceSchema>;

// STATUS RESOURCE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const StatusResourceOptionalDefaultsSchema = StatusResourceSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type StatusResourceOptionalDefaults = z.infer<typeof StatusResourceOptionalDefaultsSchema>;

/////////////////////////////////////////
// STATUS APPROVE SCHEMA
/////////////////////////////////////////

export const StatusApproveSchema = z.object({
  name: EApproveStatusesSchema,
  uuid: z.string(),
  nameRu: z.string(),
  comment: z.string().nullish(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type StatusApprove = z.infer<typeof StatusApproveSchema>;

// STATUS APPROVE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const StatusApproveOptionalDefaultsSchema = StatusApproveSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type StatusApproveOptionalDefaults = z.infer<typeof StatusApproveOptionalDefaultsSchema>;

/////////////////////////////////////////
// TECH LOG CHANGES SCHEMA
/////////////////////////////////////////

export const TechLogChangesSchema = z.object({
  action: EEntityActionsSchema,
  uuid: z.string(),
  name: z.string().nullish(),
  entity: z.string(),
  comment: z.string().nullish(),
  oldInfo: z.string().nullish(),
  newInfo: z.string(),
  updateInfo: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TechLogChanges = z.infer<typeof TechLogChangesSchema>;

// TECH LOG CHANGES OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TechLogChangesOptionalDefaultsSchema = TechLogChangesSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type TechLogChangesOptionalDefaults = z.infer<typeof TechLogChangesOptionalDefaultsSchema>;

/////////////////////////////////////////
// ESTIMATE SCHEMA
/////////////////////////////////////////

export const EstimateSchema = z.object({
  estimateStatus: EActiveStatusesSchema,
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  defaultMarkupPercent: z.number(),
  totalCost: z.number(),
  totalClientPrice: z.number(),
  projectUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Estimate = z.infer<typeof EstimateSchema>;

// ESTIMATE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const EstimateOptionalDefaultsSchema = EstimateSchema.merge(
  z.object({
    estimateStatus: EActiveStatusesSchema.optional(),
    uuid: z.string().optional(),
    defaultMarkupPercent: z.number().optional(),
    totalCost: z.number().optional(),
    totalClientPrice: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type EstimateOptionalDefaults = z.infer<typeof EstimateOptionalDefaultsSchema>;

/////////////////////////////////////////
// ESTIMATE SECTION SCHEMA
/////////////////////////////////////////

export const EstimateSectionSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  orderIndex: z.number(),
  estimateUuid: z.string(),
  parentSectionUuid: z.string().nullish(),
  sectionTotalCost: z.number(),
  sectionTotalClientPrice: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type EstimateSection = z.infer<typeof EstimateSectionSchema>;

// ESTIMATE SECTION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const EstimateSectionOptionalDefaultsSchema = EstimateSectionSchema.merge(
  z.object({
    uuid: z.string().optional(),
    sectionTotalCost: z.number().optional(),
    sectionTotalClientPrice: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type EstimateSectionOptionalDefaults = z.infer<typeof EstimateSectionOptionalDefaultsSchema>;

/////////////////////////////////////////
// ESTIMATE ITEM SCHEMA
/////////////////////////////////////////

export const EstimateItemSchema = z.object({
  itemType: EEstimateItemTypeSchema,
  uuid: z.string(),
  orderIndex: z.number(),
  sectionUuid: z.string(),
  materialUuid: z.string().nullish(),
  unitTemplateUuid: z.string().nullish(),
  name: z.string(),
  unitMeasurement: z.string(),
  quantity: z.number(),
  unitCost: z.number(),
  markupPercent: z.number(),
  unitClientPrice: z.number(),
  totalCost: z.number(),
  totalClientPrice: z.number(),
  comment: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type EstimateItem = z.infer<typeof EstimateItemSchema>;

// ESTIMATE ITEM OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const EstimateItemOptionalDefaultsSchema = EstimateItemSchema.merge(
  z.object({
    uuid: z.string().optional(),
    markupPercent: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type EstimateItemOptionalDefaults = z.infer<typeof EstimateItemOptionalDefaultsSchema>;

/////////////////////////////////////////
// UNIT TEMPLATE SCHEMA
/////////////////////////////////////////

export const UnitTemplateSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  unitMeasurement: z.string(),
  unitCost: z.number(),
  defaultMarkupPercent: z.number(),
  unitClientPrice: z.number(),
  handbookUuid: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UnitTemplate = z.infer<typeof UnitTemplateSchema>;

// UNIT TEMPLATE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UnitTemplateOptionalDefaultsSchema = UnitTemplateSchema.merge(
  z.object({
    uuid: z.string().optional(),
    unitCost: z.number().optional(),
    defaultMarkupPercent: z.number().optional(),
    unitClientPrice: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type UnitTemplateOptionalDefaults = z.infer<typeof UnitTemplateOptionalDefaultsSchema>;

/////////////////////////////////////////
// UNIT TEMPLATE COMPONENT SCHEMA
/////////////////////////////////////////

export const UnitTemplateComponentSchema = z.object({
  itemType: EEstimateItemTypeSchema,
  uuid: z.string(),
  orderIndex: z.number(),
  unitTemplateUuid: z.string(),
  materialUuid: z.string().nullish(),
  name: z.string(),
  unitMeasurement: z.string(),
  quantityPerUnit: z.number(),
  unitCost: z.number(),
  comment: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UnitTemplateComponent = z.infer<typeof UnitTemplateComponentSchema>;

// UNIT TEMPLATE COMPONENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UnitTemplateComponentOptionalDefaultsSchema = UnitTemplateComponentSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type UnitTemplateComponentOptionalDefaults = z.infer<typeof UnitTemplateComponentOptionalDefaultsSchema>;

/////////////////////////////////////////
// ESTIMATE ITEM COMPONENT SCHEMA
/////////////////////////////////////////

export const EstimateItemComponentSchema = z.object({
  itemType: EEstimateItemTypeSchema,
  uuid: z.string(),
  orderIndex: z.number(),
  estimateItemUuid: z.string(),
  materialUuid: z.string().nullish(),
  name: z.string(),
  unitMeasurement: z.string(),
  quantityPerUnit: z.number(),
  unitCost: z.number(),
  totalCost: z.number(),
  comment: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type EstimateItemComponent = z.infer<typeof EstimateItemComponentSchema>;

// ESTIMATE ITEM COMPONENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const EstimateItemComponentOptionalDefaultsSchema = EstimateItemComponentSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type EstimateItemComponentOptionalDefaults = z.infer<typeof EstimateItemComponentOptionalDefaultsSchema>;

/////////////////////////////////////////
// FILE STORAGE SCHEMA
/////////////////////////////////////////

export const FileStorageSchema = z.object({
  uuid: z.string(),
  nameFile: z.string(),
  comment: z.string().nullish(),
  link: z.string(),
  lastChangeByUserUuid: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FileStorage = z.infer<typeof FileStorageSchema>;

// FILE STORAGE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FileStorageOptionalDefaultsSchema = FileStorageSchema.merge(
  z.object({
    uuid: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type FileStorageOptionalDefaults = z.infer<typeof FileStorageOptionalDefaultsSchema>;
