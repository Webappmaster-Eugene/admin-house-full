"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const global_category_business_value_schema_1 = require("../../models/global-category-material/global-category-business-value.schema");
const GlobalCategoryMaterialGetResponseEntitySchema = global_category_business_value_schema_1.GlobalCategoryMaterialBusinessValueSchema;
const GlobalCategoryMaterialGetResponseSchema = zod_1.z
    .object({
    data: GlobalCategoryMaterialGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialGetCommand;
(function (GlobalCategoryMaterialGetCommand) {
    GlobalCategoryMaterialGetCommand.ResponseSchema = GlobalCategoryMaterialGetResponseSchema;
    GlobalCategoryMaterialGetCommand.ResponseEntitySchema = GlobalCategoryMaterialGetResponseEntitySchema;
})(GlobalCategoryMaterialGetCommand || (exports.GlobalCategoryMaterialGetCommand = GlobalCategoryMaterialGetCommand = {}));
