"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const CategoryMaterialGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.CategoryMaterialSchema.pick({
        name: true,
        templateName: true,
        comment: true,
        uuid: true,
        globalCategoryMaterialUuid: true,
        lastChangeByUserUuid: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var CategoryMaterialGetAllCommand;
(function (CategoryMaterialGetAllCommand) {
    CategoryMaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    CategoryMaterialGetAllCommand.ResponseSchema = CategoryMaterialGetAllResponseSchema;
})(CategoryMaterialGetAllCommand || (exports.CategoryMaterialGetAllCommand = CategoryMaterialGetAllCommand = {}));
