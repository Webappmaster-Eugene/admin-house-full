"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialDeleteManyCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const category_material_business_value_schema_js_1 = require("../../models/category-material/category-material-business-value.schema.js");
const category_material_related_entities_schema_1 = require("../../models/category-material/category-material-related-entities.schema");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const CategoryMaterialDeleteManyResponseEntitySchema = zod_1.z.array(category_material_business_value_schema_js_1.CategoryMaterialBusinessValueSchema.merge(category_material_related_entities_schema_1.CategoryMaterialRelatedEntitiesSchema));
const CategoryMaterialDeleteManyRequestSchema = zod_1.z.array(entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema);
const CategoryMaterialDeleteManyResponseSchema = zod_1.z
    .object({
    data: CategoryMaterialDeleteManyResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CategoryMaterialDeleteManyCommand;
(function (CategoryMaterialDeleteManyCommand) {
    CategoryMaterialDeleteManyCommand.RequestSchema = CategoryMaterialDeleteManyRequestSchema;
    CategoryMaterialDeleteManyCommand.ResponseSchema = CategoryMaterialDeleteManyResponseSchema;
    CategoryMaterialDeleteManyCommand.ResponseEntitySchema = CategoryMaterialDeleteManyResponseEntitySchema;
})(CategoryMaterialDeleteManyCommand || (exports.CategoryMaterialDeleteManyCommand = CategoryMaterialDeleteManyCommand = {}));
