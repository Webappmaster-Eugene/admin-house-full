"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const category_material_business_value_schema_1 = require("../../models/category-material/category-material-business-value.schema");
const CategoryMaterialCreateResponseEntitySchema = models_1.CategoryMaterialSchema.pick({
    name: true,
    templateName: true,
    comment: true,
    uuid: true,
    globalCategoryMaterialUuid: true,
    lastChangeByUserUuid: true,
}).merge(category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema);
const CategoryMaterialCreateRequestSchema = models_1.CategoryMaterialSchema.pick({
    name: true,
    comment: true,
    templateName: true,
    globalCategoryMaterialUuid: true,
});
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
