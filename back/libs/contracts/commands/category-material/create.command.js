"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const CategoryMaterialCreateResponseEntitySchema = models_2.CategoryMaterialSchema.pick({
    name: true,
    templateName: true,
    comment: true,
    uuid: true,
    globalCategoryMaterialUuid: true,
    lastChangeByUserUuid: true,
});
const CategoryMaterialCreateRequestSchema = models_2.CategoryMaterialSchema.pick({
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
