"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const CategoryMaterialCreateRequestSchema = models_2.CategoryMaterialSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
});
const CategoryMaterialCreateResponseSchema = zod_1.z
    .object({
    data: models_2.CategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var CategoryMaterialCreateCommand;
(function (CategoryMaterialCreateCommand) {
    CategoryMaterialCreateCommand.RequestSchema = CategoryMaterialCreateRequestSchema;
    CategoryMaterialCreateCommand.ResponseSchema = CategoryMaterialCreateResponseSchema;
})(CategoryMaterialCreateCommand || (exports.CategoryMaterialCreateCommand = CategoryMaterialCreateCommand = {}));