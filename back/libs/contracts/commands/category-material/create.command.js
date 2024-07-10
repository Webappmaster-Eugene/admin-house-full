"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const objSchema = zod_1.z.object({
    materials: zod_1.z.array(models_1.MaterialBusinessValueSchema).nullable().optional(),
    fieldsOfCategoryMaterials: zod_1.z.array(models_1.FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
    globalCategoryMaterial: models_1.GlobalCategoryMaterialBusinessValueSchema,
    handbook: models_1.HandbookBusinessValueSchema,
});
const CategoryMaterialCreateResponseEntitySchema = models_1.CategoryMaterialSchema.pick({
    name: true,
    templateName: true,
    comment: true,
    uuid: true,
    globalCategoryMaterialUuid: true,
    lastChangeByUserUuid: true,
}).merge(objSchema);
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
