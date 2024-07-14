"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const global_category_business_value_schema_1 = require("../../models/global-category-material/global-category-business-value.schema");
const models_1 = require("../../models");
const GlobalCategoryMaterialGetAllResponseEntitySchema = zod_1.z.array(global_category_business_value_schema_1.GlobalCategoryMaterialBusinessValueSchema);
const GlobalCategoryMaterialGetAllResponseSchema = zod_1.z
    .object({
    data: GlobalCategoryMaterialGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialGetAllCommand;
(function (GlobalCategoryMaterialGetAllCommand) {
    GlobalCategoryMaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    GlobalCategoryMaterialGetAllCommand.ResponseSchema = GlobalCategoryMaterialGetAllResponseSchema;
    GlobalCategoryMaterialGetAllCommand.ResponseEntitySchema = GlobalCategoryMaterialGetAllResponseEntitySchema;
})(GlobalCategoryMaterialGetAllCommand || (exports.GlobalCategoryMaterialGetAllCommand = GlobalCategoryMaterialGetAllCommand = {}));
