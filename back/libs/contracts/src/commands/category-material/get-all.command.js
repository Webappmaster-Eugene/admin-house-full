"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const category_material_business_value_schema_1 = require("../../models/category-material/category-material-business-value.schema");
const category_material_related_entities_schema_1 = require("../../models/category-material/category-material-related-entities.schema");
const CategoryMaterialGetAllResponseEntitySchema = zod_1.z.array(category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema.merge(category_material_related_entities_schema_1.CategoryMaterialRelatedEntitiesSchema));
const CategoryMaterialGetAllResponseSchema = zod_1.z
    .object({
    data: CategoryMaterialGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var CategoryMaterialGetAllCommand;
(function (CategoryMaterialGetAllCommand) {
    CategoryMaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    CategoryMaterialGetAllCommand.ResponseSchema = CategoryMaterialGetAllResponseSchema;
    CategoryMaterialGetAllCommand.ResponseEntitySchema = CategoryMaterialGetAllResponseEntitySchema;
})(CategoryMaterialGetAllCommand || (exports.CategoryMaterialGetAllCommand = CategoryMaterialGetAllCommand = {}));
