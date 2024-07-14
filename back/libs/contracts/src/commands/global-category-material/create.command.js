"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const global_category_business_value_schema_1 = require("../../models/global-category-material/global-category-business-value.schema");
const GlobalCategoryMaterialCreateResponseEntitySchema = global_category_business_value_schema_1.GlobalCategoryMaterialBusinessValueSchema;
const GlobalCategoryMaterialCreateRequestSchema = models_1.GlobalCategoryMaterialSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    color: true,
});
const GlobalCategoryMaterialCreateResponseSchema = zod_1.z
    .object({
    data: GlobalCategoryMaterialCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialCreateCommand;
(function (GlobalCategoryMaterialCreateCommand) {
    GlobalCategoryMaterialCreateCommand.RequestSchema = GlobalCategoryMaterialCreateRequestSchema;
    GlobalCategoryMaterialCreateCommand.ResponseSchema = GlobalCategoryMaterialCreateResponseSchema;
    GlobalCategoryMaterialCreateCommand.ResponseEntitySchema = GlobalCategoryMaterialCreateResponseEntitySchema;
})(GlobalCategoryMaterialCreateCommand || (exports.GlobalCategoryMaterialCreateCommand = GlobalCategoryMaterialCreateCommand = {}));
