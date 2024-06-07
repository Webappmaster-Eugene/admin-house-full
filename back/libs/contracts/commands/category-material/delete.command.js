"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const CategoryMaterialDeleteResponseSchema = zod_1.z
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
var CategoryMaterialDeleteCommand;
(function (CategoryMaterialDeleteCommand) {
    CategoryMaterialDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    CategoryMaterialDeleteCommand.ResponseSchema = CategoryMaterialDeleteResponseSchema;
})(CategoryMaterialDeleteCommand || (exports.CategoryMaterialDeleteCommand = CategoryMaterialDeleteCommand = {}));
