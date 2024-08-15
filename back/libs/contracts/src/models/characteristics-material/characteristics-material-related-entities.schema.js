"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const material_business_value_schema_1 = require("../material/material-business-value.schema");
const field_of_category_material_business_value_schema_1 = require("../field-of-category-material/field-of-category-material-business-value.schema");
const handbook_business_value_schema_1 = require("../handbook/handbook-business-value.schema");
exports.CharacteristicsMaterialRelatedEntitiesSchema = zod_1.z.object({
    material: material_business_value_schema_1.MaterialBusinessValueSchema,
    fieldOfCategoryMaterial: field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema,
    handbook: handbook_business_value_schema_1.HandbookBusinessValueSchema,
});
