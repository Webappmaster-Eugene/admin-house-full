"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const global_category_business_value_schema_1 = require("../../models/global-category-material/global-category-business-value.schema");
const models_1 = require("../../models");
const GlobalCategoryMaterialDeleteResponseEntitySchema = global_category_business_value_schema_1.GlobalCategoryMaterialBusinessValueSchema;
const GlobalCategoryMaterialDeleteResponseSchema = zod_1.z
    .object({
    data: GlobalCategoryMaterialDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialDeleteCommand;
(function (GlobalCategoryMaterialDeleteCommand) {
    GlobalCategoryMaterialDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    GlobalCategoryMaterialDeleteCommand.ResponseSchema = GlobalCategoryMaterialDeleteResponseSchema;
    GlobalCategoryMaterialDeleteCommand.ResponseEntitySchema = GlobalCategoryMaterialDeleteResponseEntitySchema;
})(GlobalCategoryMaterialDeleteCommand || (exports.GlobalCategoryMaterialDeleteCommand = GlobalCategoryMaterialDeleteCommand = {}));
