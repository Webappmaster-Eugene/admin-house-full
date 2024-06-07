"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const GlobalCategoryMaterialDeleteResponseSchema = zod_1.z
    .object({
    data: models_2.GlobalCategoryMaterialSchema.pick({
        name: true,
        nameRu: true,
        comment: true,
        color: true,
        uuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialDeleteCommand;
(function (GlobalCategoryMaterialDeleteCommand) {
    GlobalCategoryMaterialDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    GlobalCategoryMaterialDeleteCommand.ResponseSchema = GlobalCategoryMaterialDeleteResponseSchema;
})(GlobalCategoryMaterialDeleteCommand || (exports.GlobalCategoryMaterialDeleteCommand = GlobalCategoryMaterialDeleteCommand = {}));
