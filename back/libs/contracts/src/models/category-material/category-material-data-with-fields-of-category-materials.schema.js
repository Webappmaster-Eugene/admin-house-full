"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialDataWithFieldsOfCategoryMaterialsSchema = void 0;
const zod_1 = require("zod");
const field_of_category_material_business_value_schema_1 = require("../../models/field-of-category-material/field-of-category-material-business-value.schema");
exports.CategoryMaterialDataWithFieldsOfCategoryMaterialsSchema = zod_1.z.object({
    fieldsOfCategoryMaterials: zod_1.z.array(field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
    fieldsOfCategoryMaterialsInTemplate: zod_1.z.array(field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
});
