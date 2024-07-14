"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const category_material_business_value_schema_1 = require("../../models/category-material/category-material-business-value.schema");
const category_material_related_entities_schema_1 = require("../../models/category-material/category-material-related-entities.schema");
const CategoryMaterialGetResponseEntitySchema = category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema.merge(category_material_related_entities_schema_1.CategoryMaterialRelatedEntitiesSchema);
const CategoryMaterialGetResponseSchema = zod_1.z
    .object({
    data: CategoryMaterialGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CategoryMaterialGetCommand;
(function (CategoryMaterialGetCommand) {
    CategoryMaterialGetCommand.ResponseSchema = CategoryMaterialGetResponseSchema;
    CategoryMaterialGetCommand.ResponseEntitySchema = CategoryMaterialGetResponseEntitySchema;
})(CategoryMaterialGetCommand || (exports.CategoryMaterialGetCommand = CategoryMaterialGetCommand = {}));
