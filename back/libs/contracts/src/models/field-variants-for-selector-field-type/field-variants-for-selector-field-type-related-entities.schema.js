"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const handbook_business_value_schema_1 = require("../handbook/handbook-business-value.schema");
const field_of_category_material_business_value_schema_1 = require("../field-of-category-material/field-of-category-material-business-value.schema");
exports.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema = zod_1.z.object({
    handbook: handbook_business_value_schema_1.HandbookBusinessValueSchema,
    fieldOfCategoryMaterial: field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema,
});
