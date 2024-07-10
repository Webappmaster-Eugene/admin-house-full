"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const CategoryMaterialUpdateResponseEntitySchema = models_1.CategoryMaterialBusinessValueSchema.merge(models_1.CategoryMaterialRelatedEntitiesSchema);
const CategoryMaterialUpdateRequestSchema = models_1.CategoryMaterialSchema.pick({
    name: true,
    comment: true,
    templateName: true,
}).partial();
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
