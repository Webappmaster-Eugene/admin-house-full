"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const material_business_value_schema_1 = require("../material/material-business-value.schema");
const field_of_category_material_business_value_schema_1 = require("../field-of-category-material/field-of-category-material-business-value.schema");
const global_category_business_value_schema_1 = require("../global-category-material/global-category-business-value.schema");
const handbook_business_value_schema_1 = require("../handbook/handbook-business-value.schema");
exports.CategoryMaterialRelatedEntitiesSchema = zod_1.z.object({
    materials: zod_1.z.array(material_business_value_schema_1.MaterialBusinessValueSchema).nullable().optional(),
    fieldsOfCategoryMaterials: zod_1.z.array(field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
    fieldsOfCategoryMaterialsInTemplate: zod_1.z.array(field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
    globalCategoryMaterial: global_category_business_value_schema_1.GlobalCategoryMaterialBusinessValueSchema,
    handbook: handbook_business_value_schema_1.HandbookBusinessValueSchema,
});
