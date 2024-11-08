"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const category_material_business_value_schema_1 = require("../../models/category-material/category-material-business-value.schema");
const category_material_related_entities_schema_1 = require("../../models/category-material/category-material-related-entities.schema");
const CategoryMaterialUpdateResponseEntitySchema = category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema.merge(category_material_related_entities_schema_1.CategoryMaterialRelatedEntitiesSchema);
const CategoryMaterialUpdateRequestSchema = models_1.CategoryMaterialSchema.pick({ templateName: true }).partial();
const CategoryMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: CategoryMaterialUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CategoryMaterialUpdateCommand;
(function (CategoryMaterialUpdateCommand) {
    CategoryMaterialUpdateCommand.RequestSchema = CategoryMaterialUpdateRequestSchema;
    CategoryMaterialUpdateCommand.ResponseSchema = CategoryMaterialUpdateResponseSchema;
    CategoryMaterialUpdateCommand.ResponseEntitySchema = CategoryMaterialUpdateResponseEntitySchema;
})(CategoryMaterialUpdateCommand || (exports.CategoryMaterialUpdateCommand = CategoryMaterialUpdateCommand = {}));
