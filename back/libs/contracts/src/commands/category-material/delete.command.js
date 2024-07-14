"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const index_js_1 = require("../../commands/common/index.js");
const models_1 = require("../../models");
const category_material_business_value_schema_js_1 = require("../../models/category-material/category-material-business-value.schema.js");
const category_material_related_entities_schema_1 = require("../../models/category-material/category-material-related-entities.schema");
const CategoryMaterialDeleteResponseEntitySchema = category_material_business_value_schema_js_1.CategoryMaterialBusinessValueSchema.merge(category_material_related_entities_schema_1.CategoryMaterialRelatedEntitiesSchema);
const CategoryMaterialDeleteResponseSchema = zod_1.z
    .object({
    data: CategoryMaterialDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CategoryMaterialDeleteCommand;
(function (CategoryMaterialDeleteCommand) {
    CategoryMaterialDeleteCommand.RequestParamSchema = index_js_1.EntityUrlParamCommand.RequestUuidParamSchema;
    CategoryMaterialDeleteCommand.ResponseSchema = CategoryMaterialDeleteResponseSchema;
    CategoryMaterialDeleteCommand.ResponseEntitySchema = CategoryMaterialDeleteResponseEntitySchema;
})(CategoryMaterialDeleteCommand || (exports.CategoryMaterialDeleteCommand = CategoryMaterialDeleteCommand = {}));
