"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialDataWithCategoryMaterials = void 0;
const zod_1 = require("zod");
const category_material_business_value_schema_1 = require("../../models/category-material/category-material-business-value.schema");
exports.FieldOfCategoryMaterialDataWithCategoryMaterials = zod_1.z.object({
    categoriesMaterial: zod_1.z.array(category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema).nullable().optional(),
    //categoriesMaterialsTemplatesIncludesThisField: z.array(CategoryMaterialBusinessValueSchema).nullable().optional(),
});
