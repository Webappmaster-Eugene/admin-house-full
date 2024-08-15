"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const field_unit_measurement_business_value_schema_1 = require("../field-unit-measurement/field-unit-measurement-business-value.schema");
const field_of_category_material_business_value_schema_1 = require("../field-of-category-material/field-of-category-material-business-value.schema");
const material_business_value_schema_1 = require("../material/material-business-value.schema");
const workspace_business_value_schema_1 = require("../workspace/workspace-business-value.schema");
const responsible_partner_producer_business_value_schema_1 = require("../responsible-partner-producer/responsible-partner-producer-business-value.schema");
const user_business_value_schema_1 = require("../user/user-business-value.schema");
const category_material_business_value_schema_1 = require("../category-material/category-material-business-value.schema");
exports.HandbookRelatedEntitiesSchema = zod_1.z.object({
    fieldUnitMeasurements: zod_1.z.array(field_unit_measurement_business_value_schema_1.FieldUnitMeasurementBusinessValueSchema).nullable().optional(),
    responsibleManager: user_business_value_schema_1.UserBusinessValueSchema,
    responsiblePartnerProducers: zod_1.z.array(responsible_partner_producer_business_value_schema_1.ResponsiblePartnerProducerBusinessValueSchema).nullable().optional(),
    workspace: workspace_business_value_schema_1.WorkspaceBusinessValueSchema,
    materials: zod_1.z.array(material_business_value_schema_1.MaterialBusinessValueSchema).nullable().optional(),
    categoryMaterials: zod_1.z.array(category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema).nullable().optional(),
    fieldsOfCategoryMaterials: zod_1.z.array(field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
});
