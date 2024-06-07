"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const CategoryMaterialGetResponseSchema = zod_1.z
    .object({
    data: models_1.CategoryMaterialSchema.pick({
        name: true,
        templateName: true,
        comment: true,
        uuid: true,
        globalCategoryMaterialUuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var CategoryMaterialGetCommand;
(function (CategoryMaterialGetCommand) {
    CategoryMaterialGetCommand.ResponseSchema = CategoryMaterialGetResponseSchema;
})(CategoryMaterialGetCommand || (exports.CategoryMaterialGetCommand = CategoryMaterialGetCommand = {}));
