"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const category_material_business_value_schema_1 = require("../../models/category-material/category-material-business-value.schema");
const category_material_related_entities_schema_1 = require("../../models/category-material/category-material-related-entities.schema");
const category_material_data_with_fields_of_category_materials_schema_1 = require("../../models/category-material/category-material-data-with-fields-of-category-materials.schema");
const CategoryMaterialUpdateResponseEntitySchema = category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema.merge(category_material_related_entities_schema_1.CategoryMaterialRelatedEntitiesSchema);
const CategoryMaterialUpdateRequestSchema = models_1.CategoryMaterialSchema.pick({
    name: true,
    comment: true,
    categoryMaterialStatus: true,
    templateName: true,
})
    .partial()
    .merge(category_material_data_with_fields_of_category_materials_schema_1.CategoryMaterialDataWithFieldsOfCategoryMaterialsSchema);
const CategoryMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: CategoryMaterialUpdateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var CategoryMaterialUpdateCommand;
(function (CategoryMaterialUpdateCommand) {
    CategoryMaterialUpdateCommand.RequestSchema = CategoryMaterialUpdateRequestSchema;
    CategoryMaterialUpdateCommand.ResponseSchema = CategoryMaterialUpdateResponseSchema;
    CategoryMaterialUpdateCommand.ResponseEntitySchema = CategoryMaterialUpdateResponseEntitySchema;
})(CategoryMaterialUpdateCommand || (exports.CategoryMaterialUpdateCommand = CategoryMaterialUpdateCommand = {}));
