"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const category_material_business_value_schema_1 = require("../../models/category-material/category-material-business-value.schema");
const category_material_related_entities_schema_1 = require("../../models/category-material/category-material-related-entities.schema");
const category_material_data_with_fields_of_category_materials_schema_1 = require("../../models/category-material/category-material-data-with-fields-of-category-materials.schema");
const CategoryMaterialCreateResponseEntitySchema = category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema.merge(category_material_related_entities_schema_1.CategoryMaterialRelatedEntitiesSchema);
const CategoryMaterialCreateRequestSchema = models_1.CategoryMaterialSchema.pick({
    name: true,
    comment: true,
    templateName: true,
    categoryMaterialStatus: true,
    globalCategoryMaterialUuid: true,
}).merge(category_material_data_with_fields_of_category_materials_schema_1.CategoryMaterialDataWithFieldsOfCategoryMaterialsSchema);
const CategoryMaterialCreateResponseSchema = zod_1.z
    .object({
    data: CategoryMaterialCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CategoryMaterialCreateCommand;
(function (CategoryMaterialCreateCommand) {
    CategoryMaterialCreateCommand.RequestSchema = CategoryMaterialCreateRequestSchema;
    CategoryMaterialCreateCommand.ResponseSchema = CategoryMaterialCreateResponseSchema;
    CategoryMaterialCreateCommand.ResponseEntitySchema = CategoryMaterialCreateResponseEntitySchema;
})(CategoryMaterialCreateCommand || (exports.CategoryMaterialCreateCommand = CategoryMaterialCreateCommand = {}));
