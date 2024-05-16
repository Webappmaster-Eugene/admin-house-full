"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const CategoryMaterialUpdateRequestSchema = models_1.CategoryMaterialSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
    globalCategoryMaterialUuid: true,
}).partial();
const CategoryMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.CategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var CategoryMaterialUpdateCommand;
(function (CategoryMaterialUpdateCommand) {
    CategoryMaterialUpdateCommand.RequestSchema = CategoryMaterialUpdateRequestSchema;
    CategoryMaterialUpdateCommand.ResponseSchema = CategoryMaterialUpdateResponseSchema;
})(CategoryMaterialUpdateCommand || (exports.CategoryMaterialUpdateCommand = CategoryMaterialUpdateCommand = {}));
